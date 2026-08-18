// =========================================================
// JL PORTFOLIO CONTACT API
// Vercel Function + Resend
// =========================================================

const MINIMUM_FORM_TIME_MS = 1500;

const MAXIMUM_FORM_TIME_MS =
    24 * 60 * 60 * 1000;


export async function POST(request) {

    try {

        // =================================================
        // ENVIRONMENT VARIABLES
        // =================================================

        const resendApiKey =
            process.env.RESEND_API_KEY;


        const contactToEmail =
            process.env.CONTACT_TO_EMAIL;


        if (
            !resendApiKey ||
            !contactToEmail
        ) {

            console.error(
                "Missing contact form environment variables."
            );


            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Contact service is not configured yet."
                },
                500
            );

        }


        // =================================================
        // READ JSON
        // =================================================

        let body;


        try {

            body =
                await request.json();

        } catch {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Invalid request."
                },
                400
            );

        }


        // =================================================
        // VALUES
        // =================================================

        const name =
            cleanString(
                body.name,
                80
            );


        const email =
            cleanString(
                body.email,
                150
            );


        const subject =
            cleanString(
                body.subject,
                120
            );


        const message =
            cleanString(
                body.message,
                3000
            );


        const company =
            cleanString(
                body.company,
                200
            );


        const startedAt =
            Number(
                body.startedAt
            );


        // =================================================
        // HONEYPOT
        // =================================================

        if (company) {

            // Pretend success so bots don't learn
            // that they were detected.

            return jsonResponse(
                {
                    success:
                        true,

                    message:
                        "Message sent."
                },
                200
            );

        }


        // =================================================
        // TIME-BASED BOT CHECK
        // =================================================

        if (
            !Number.isFinite(
                startedAt
            )
        ) {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Please refresh the page and try again."
                },
                400
            );

        }


        const formAge =
            Date.now() -
            startedAt;


        if (
            formAge <
            MINIMUM_FORM_TIME_MS
        ) {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Please wait a moment before sending."
                },
                429
            );

        }


        if (
            formAge >
            MAXIMUM_FORM_TIME_MS
        ) {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "This form session expired. Refresh the page and try again."
                },
                400
            );

        }


        // =================================================
        // VALIDATION
        // =================================================

        if (
            name.length <
            2
        ) {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Please enter your name."
                },
                400
            );

        }


        if (
            !isValidEmail(
                email
            )
        ) {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Please enter a valid email address."
                },
                400
            );

        }


        if (
            subject.length <
            3
        ) {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Please enter a subject."
                },
                400
            );

        }


        if (
            message.length <
            10
        ) {

            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Your message is too short."
                },
                400
            );

        }


        // =================================================
        // EMAIL CONTENT
        // =================================================

        const safeName =
            escapeHTML(
                name
            );


        const safeEmail =
            escapeHTML(
                email
            );


        const safeSubject =
            escapeHTML(
                subject
            );


        const safeMessage =
            escapeHTML(
                message
            )
            .replace(
                /\n/g,
                "<br>"
            );


        const emailHTML = `

            <!DOCTYPE html>

            <html>

            <body
                style="
                    margin: 0;
                    padding: 30px;
                    background: #050a12;
                    color: #eaf5ff;
                    font-family: Arial, sans-serif;
                "
            >

                <div
                    style="
                        max-width: 650px;
                        margin: 0 auto;
                        overflow: hidden;
                        border: 1px solid #123454;
                        border-radius: 14px;
                        background: #07111f;
                    "
                >

                    <div
                        style="
                            padding: 24px 28px;
                            border-bottom: 1px solid #123454;
                            background: #08182b;
                        "
                    >

                        <div
                            style="
                                color: #38b6ff;
                                font-size: 12px;
                                letter-spacing: 2px;
                            "
                        >
                            JL PORTFOLIO
                        </div>

                        <h2
                            style="
                                margin: 8px 0 0;
                                color: #ffffff;
                            "
                        >
                            New Contact Message
                        </h2>

                    </div>


                    <div
                        style="
                            padding: 28px;
                        "
                    >

                        <p
                            style="
                                margin-top: 0;
                                color: #8398ad;
                            "
                        >
                            Someone sent you a message through your portfolio.
                        </p>


                        <div
                            style="
                                margin: 24px 0;
                                padding: 18px;
                                border: 1px solid #123454;
                                border-radius: 10px;
                                background: #050c16;
                            "
                        >

                            <p>
                                <strong style="color:#38b6ff;">
                                    Name:
                                </strong>

                                ${safeName}
                            </p>


                            <p>
                                <strong style="color:#38b6ff;">
                                    Email:
                                </strong>

                                ${safeEmail}
                            </p>


                            <p>
                                <strong style="color:#38b6ff;">
                                    Subject:
                                </strong>

                                ${safeSubject}
                            </p>

                        </div>


                        <div
                            style="
                                padding: 20px;
                                border-left: 3px solid #008cff;
                                background: #050c16;
                                line-height: 1.8;
                                color: #c7d7e8;
                            "
                        >
                            ${safeMessage}
                        </div>


                        <p
                            style="
                                margin: 24px 0 0;
                                color: #536a80;
                                font-size: 12px;
                            "
                        >
                            Reply to this email to respond directly to ${safeName}.
                        </p>

                    </div>

                </div>

            </body>

            </html>

        `;


        const emailText = `

New message from your JL Portfolio

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Reply to this email to respond directly to ${name}.

        `.trim();


        // =================================================
        // SEND USING RESEND
        // =================================================

        const resendResponse =
            await fetch(
                "https://api.resend.com/emails",
                {

                    method:
                        "POST",

                    headers: {

                        Authorization:
                            `Bearer ${resendApiKey}`,

                        "Content-Type":
                            "application/json",

                        "User-Agent":
                            "JL-Portfolio-Contact/1.0"

                    },

                    body:
                        JSON.stringify(
                            {

                                from:
                                    "JL Portfolio <onboarding@resend.dev>",

                                to: [
                                    contactToEmail
                                ],

                                reply_to:
                                    email,

                                subject:
                                    `[Portfolio] ${subject}`,

                                html:
                                    emailHTML,

                                text:
                                    emailText

                            }
                        )

                }
            );


        const resendResult =
            await safeJSON(
                resendResponse
            );


        if (
            !resendResponse.ok
        ) {

            console.error(
                "Resend failed:",
                resendResult
            );


            return jsonResponse(
                {
                    success:
                        false,

                    message:
                        "Message delivery failed. Please try again later."
                },
                502
            );

        }


        // =================================================
        // SUCCESS
        // =================================================

        return jsonResponse(
            {
                success:
                    true,

                message:
                    "Message sent successfully."
            },
            200
        );


    } catch (error) {

        console.error(
            "Contact API error:",
            error
        );


        return jsonResponse(
            {
                success:
                    false,

                message:
                    "Something went wrong while sending the message."
            },
            500
        );

    }

}


// =========================================================
// OPTIONAL GET RESPONSE
// =========================================================

export async function GET() {

    return jsonResponse(
        {
            status:
                "online",

            service:
                "JL Portfolio Contact API"
        },
        200
    );

}


// =========================================================
// HELPERS
// =========================================================

function cleanString(
    value,
    maxLength
) {

    return String(
        value ??
        ""
    )
    .trim()
    .slice(
        0,
        maxLength
    );

}


function isValidEmail(
    email
) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );

}


function escapeHTML(
    value
) {

    return String(
        value
    )

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );

}


async function safeJSON(
    response
) {

    try {

        return await response.json();

    } catch {

        return {};

    }

}


function jsonResponse(
    data,
    status
) {

    return new Response(
        JSON.stringify(
            data
        ),
        {

            status,

            headers: {

                "Content-Type":
                    "application/json; charset=utf-8",

                "Cache-Control":
                    "no-store"

            }

        }
    );

}
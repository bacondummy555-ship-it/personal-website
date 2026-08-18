// =========================================================
// JL PORTFOLIO CONTACT API
// VERCEL FUNCTION + RESEND
// =========================================================


// ---------------------------------------------------------
// SETTINGS
// ---------------------------------------------------------

const MINIMUM_FORM_TIME_MS = 1500;

const MAXIMUM_FORM_TIME_MS =
    24 * 60 * 60 * 1000;


// =========================================================
// GET
// =========================================================
// Lets us check whether the API is online by visiting:
//
// /api/contact
// =========================================================

export function GET() {

    return jsonResponse(
        {
            status: "online",
            service: "JL Portfolio Contact API",
            emailService: "Resend"
        },
        200
    );

}


// =========================================================
// POST
// =========================================================

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
                "Missing RESEND_API_KEY or CONTACT_TO_EMAIL."
            );


            return jsonResponse(
                {
                    success: false,
                    message:
                        "Contact service is not configured correctly."
                },
                500
            );

        }


        // =================================================
        // READ REQUEST BODY
        // =================================================

        let body;


        try {

            body =
                await request.json();

        } catch {

            return jsonResponse(
                {
                    success: false,
                    message:
                        "Invalid request."
                },
                400
            );

        }


        // =================================================
        // CLEAN INPUT
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
        // HONEYPOT BOT PROTECTION
        // =================================================

        if (company) {

            // Pretend the message succeeded.
            // Bots won't know they were blocked.

            return jsonResponse(
                {
                    success: true,
                    message:
                        "Message sent successfully."
                },
                200
            );

        }


        // =================================================
        // FORM TIMER CHECK
        // =================================================

        if (
            !Number.isFinite(
                startedAt
            )
        ) {

            return jsonResponse(
                {
                    success: false,
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
                    success: false,
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
                    success: false,
                    message:
                        "Your form session expired. Refresh the page and try again."
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
                    success: false,
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
                    success: false,
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
                    success: false,
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
                    success: false,
                    message:
                        "Your message is too short."
                },
                400
            );

        }


        // =================================================
        // SAFE HTML VALUES
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


        // =================================================
        // EMAIL HTML
        // =================================================

        const emailHTML = `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

</head>


<body
    style="
        margin: 0;
        padding: 30px;
        background: #02050a;
        color: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
    "
>

    <div
        style="
            max-width: 650px;
            margin: 0 auto;
            overflow: hidden;
            border: 1px solid #123c61;
            border-radius: 16px;
            background: #06101d;
        "
    >

        <!-- HEADER -->

        <div
            style="
                padding: 26px 30px;
                border-bottom: 1px solid #123c61;
                background:
                    linear-gradient(
                        135deg,
                        #071728,
                        #04101c
                    );
            "
        >

            <div
                style="
                    margin-bottom: 7px;
                    color: #38b6ff;
                    font-size: 11px;
                    font-weight: bold;
                    letter-spacing: 3px;
                "
            >
                &lt;JL /&gt; PORTFOLIO
            </div>


            <h1
                style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 25px;
                "
            >
                New Contact Message
            </h1>

        </div>


        <!-- CONTENT -->

        <div
            style="
                padding: 30px;
            "
        >

            <p
                style="
                    margin-top: 0;
                    margin-bottom: 24px;
                    color: #91a7bd;
                    font-size: 14px;
                    line-height: 1.7;
                "
            >
                Someone sent a new message through your
                developer portfolio.
            </p>


            <!-- CONTACT DETAILS -->

            <div
                style="
                    margin-bottom: 22px;
                    padding: 20px;
                    border: 1px solid #123550;
                    border-radius: 11px;
                    background: #040c16;
                "
            >

                <div
                    style="
                        margin-bottom: 15px;
                    "
                >

                    <div
                        style="
                            margin-bottom: 4px;
                            color: #54718b;
                            font-size: 10px;
                            font-weight: bold;
                            letter-spacing: 1.5px;
                        "
                    >
                        NAME
                    </div>

                    <div
                        style="
                            color: #e7f4ff;
                            font-size: 15px;
                        "
                    >
                        ${safeName}
                    </div>

                </div>


                <div
                    style="
                        margin-bottom: 15px;
                    "
                >

                    <div
                        style="
                            margin-bottom: 4px;
                            color: #54718b;
                            font-size: 10px;
                            font-weight: bold;
                            letter-spacing: 1.5px;
                        "
                    >
                        EMAIL
                    </div>

                    <div
                        style="
                            color: #38b6ff;
                            font-size: 15px;
                        "
                    >
                        ${safeEmail}
                    </div>

                </div>


                <div>

                    <div
                        style="
                            margin-bottom: 4px;
                            color: #54718b;
                            font-size: 10px;
                            font-weight: bold;
                            letter-spacing: 1.5px;
                        "
                    >
                        SUBJECT
                    </div>

                    <div
                        style="
                            color: #e7f4ff;
                            font-size: 15px;
                        "
                    >
                        ${safeSubject}
                    </div>

                </div>

            </div>


            <!-- MESSAGE -->

            <div
                style="
                    padding: 22px;
                    border-left: 3px solid #008cff;
                    border-radius: 5px;
                    background: #040c16;
                "
            >

                <div
                    style="
                        margin-bottom: 12px;
                        color: #38b6ff;
                        font-size: 10px;
                        font-weight: bold;
                        letter-spacing: 1.5px;
                    "
                >
                    MESSAGE
                </div>


                <div
                    style="
                        color: #bfd1e2;
                        font-size: 14px;
                        line-height: 1.8;
                    "
                >
                    ${safeMessage}
                </div>

            </div>


            <!-- REPLY NOTE -->

            <div
                style="
                    margin-top: 24px;
                    padding-top: 20px;
                    border-top: 1px solid #10283e;
                    color: #536c82;
                    font-size: 12px;
                    line-height: 1.7;
                "
            >

                Reply to this email to respond directly to
                <strong
                    style="
                        color: #91cfff;
                    "
                >
                    ${safeName}
                </strong>.

            </div>

        </div>


        <!-- FOOTER -->

        <div
            style="
                padding: 16px 30px;
                border-top: 1px solid #10283e;
                background: #040b13;
                color: #3e5870;
                font-size: 10px;
            "
        >

            Sent securely from JL Developer Portfolio

        </div>

    </div>

</body>

</html>

        `;


        // =================================================
        // PLAIN TEXT VERSION
        // =================================================

        const emailText = `

JL PORTFOLIO - NEW CONTACT MESSAGE

Name:
${name}

Email:
${email}

Subject:
${subject}

Message:
${message}

Reply to this email to respond directly to ${name}.

        `.trim();


        // =================================================
        // SEND THROUGH RESEND
        // =================================================

        const resendResponse =
            await fetch(
                "https://api.resend.com/emails",
                {

                    method: "POST",

                    headers: {

                        Authorization:
                            `Bearer ${resendApiKey}`,

                        "Content-Type":
                            "application/json"

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


        // =================================================
        // READ RESEND RESPONSE
        // =================================================

        const resendResult =
            await safeJSON(
                resendResponse
            );


        // =================================================
        // RESEND ERROR
        // =================================================

        if (
            !resendResponse.ok
        ) {

            console.error(
                "Resend API error:",
                resendResult
            );


            let publicMessage =
                "Message delivery failed. Please try again later.";


            if (
                resendResponse.status ===
                401
            ) {

                publicMessage =
                    "Email service authentication failed.";

            }


            if (
                resendResponse.status ===
                403
            ) {

                publicMessage =
                    "Email delivery is not authorized yet.";

            }


            if (
                resendResponse.status ===
                429
            ) {

                publicMessage =
                    "Too many messages were sent recently. Please try again later.";

            }


            return jsonResponse(
                {
                    success: false,
                    message:
                        publicMessage
                },
                502
            );

        }


        // =================================================
        // SUCCESS
        // =================================================

        console.log(
            "Portfolio message sent:",
            resendResult?.id ||
            "Email accepted"
        );


        return jsonResponse(
            {
                success: true,
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
                success: false,
                message:
                    "Something went wrong while sending your message."
            },
            500
        );

    }

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
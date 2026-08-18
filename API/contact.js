export function GET() {

    return new Response(
        JSON.stringify({
            status: "online",
            service: "JL Portfolio Contact API"
        }),
        {
            status: 200,

            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}


export function POST() {

    return new Response(
        JSON.stringify({
            success: true,
            message: "POST route is working."
        }),
        {
            status: 200,

            headers: {
                "Content-Type": "application/json"
            }
        }
    );

}
export default async function handler(req, res) {
    const { url } = req.query;
    const response = await fetch(url);
    const imageBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "image/jpeg");
    res.send(Buffer.from(imageBuffer));
}

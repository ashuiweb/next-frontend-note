import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;
    //@ts-ignore
    const response = await fetch(url);
    const imageBuffer = await response.arrayBuffer();
    console.log("response", response);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(Buffer.from(imageBuffer));
}

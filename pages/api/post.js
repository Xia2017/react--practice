import dbConnect from '../../db/mongodb';
import Post from '../../models/posts.model';
/**
 * @param {import('next).NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */


const post = async (req, res, Post) => {
    try {
        const body = req.body;
        body.date = new Date();
        const createdPost = await Post.create(body);
        console.log('createdPost', createdPost);
        res.status(200).send({ status: 'success', result: createdPost })

    } catch (err) {
        console.log('err1', err)
        res.status(400).send({ status: 'failed', err: err })
    }
}

const get = async (req, res, Post) => {
    try {
        const posts = await Post.find({}).exec();
        res.status(200).json({ status: 'success', result: posts })
    } catch (err) {
        console.log('err2222222', err)
        res.status(400).json({ status: 'failed', err: err });
    }
}

const getByID = async (req, res, Post) => {
    try {
        const id = req.query.id
        const matchedPost = await Post.findById(id);
        res.status(200).json({ status: 'success', result: matchedPost });
    } catch (err) {
        res.status(400).json({ status: 'failed', err: err });
    }
}



export default async function handler(req, res) {
    const db = await dbConnect();
    const includeID = req.url.includes('/api/post?id=');
    if (req.method === 'POST') { post(req, res, Post) }
    if (req.method === 'GET' && !includeID) { get(req, res, Post) }
    if (req.method === 'GET' && includeID) { getByID(req, res, Post) }
}

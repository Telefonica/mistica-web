// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    res.statusCode = 200;
    res.json({message: `Hello ${req.query.name}, your email is: ${req.query.email}`});
};

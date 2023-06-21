const notFound = (req,res,next)=>{
    res.redirect(302,'/404');
}

module.exports = notFound;
const { json } = require('body-parser');
const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: 'c5ec0a4bc7f9425c9222376a3ab0f15d'
   });


const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with api!'))
   }


const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'+ err))
  }

  module.exports = {
       handleApiCall: handleApiCall,
      handleImage: handleImage
  }
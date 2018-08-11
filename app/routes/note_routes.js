const ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id' : new ObjectID(id) };

        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });

                return;
            }

            res.send(`Note ${id} deleted!`);
        })
    })

    app.get('/notes', (req, res) => {
        db.collection('notes').find().toArray((err, items) => {
            console.log({items})
            if (err) {
                res.send({ 'error': 'An error occured' });

                return;
            }

            res.send(items)
        })
    })

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });

                return;
            }

            res.send(item);
        })
    })

    app.post('/notes', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title,
        };

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });

                return;
            }

            console.log(result.ops);
            res.send(result.ops[0]);
        })
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = {
            text: req.body.body,
            title: req.body.title,
        };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });

                return;
            }

            res.send(note);
        });
    });
};
const mongoose = require('mongoose');
const blogSchema = require('./blog-Schema');

const timme = Date.now();
const date = new Date(timme);

mongoose.connect('mongodb://localhost:27017/eje05');

var Blogs = mongoose.model('Blogs', blogSchema, 'blog');

var blog1 = new Blogs({
    title: 'The newest Blog ever',
    author: 'Carlos Fregoso',
    body: 'This is the first publication of the best and newest blog in the web, you can find lots of themes that I like and I´ll leave the commets open for healthy discussion',
    meta: { votes: 10, favs: 2 }
});

var blog2 = new Blogs({
    title: 'Just anotehr blog',
    author: 'Alexis torres',
    body: 'this blog it´s focused on the day-to-day of my person, isn´t a blog of critics but I will upload things that i think are interesting',
    comments: [
        {
            body: 'One of my favorite blogs ever, keep doing it bro',
            date: date
        }
    ],
    meta: { votes: 19990, favs: 1982 }
});

// <--------------------------------------------------------------------- fin de la creacion de los blogs


blog1.save(function (error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log('\nBlog saved sucessfully');
    //process.exit(0);
});// fin de la funcion para guardar el blog

blog2.save(function (error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log('Blog saved sucessfully');
    //process.exit(0);
    Blogs.find({}, function (error, docs) {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log('\n<----- Consulta general creación de ambos blogs ------>');
        console.log(docs);

        let titulo = 'Just Another Blog'

        Blogs.find({ title: titulo }, function (error, docs) {
            if (error) {
                console.log(error);
                process.exit(1);
            }
            console.log('\n<----- Consulta con restricción ------>');
            console.log(docs);
            let id_Blog = '609158046a92b51ed06c04f1';
            Blogs.update({ _id: id_Blog }, { $set: { title: 'Just Another Blog' } },
                function (error, docs) {
                    if (error) {
                        console.log(error);
                        process.exit(1);
                    }
                    console.log('\n<------ Update ------>');
                    console.log(docs);
                    Blogs.find({}, function (error, docs) {
                        if (error) {
                            console.log(error);
                            process.exit(1);
                        }
                        console.log('\n<----- Consulta general Actualización ------>');
                        console.log(docs);
                        //Creacion del metodo par eliminar por el id
                        Blogs.findByIdAndRemove({ _id: id_Blog }, function (error, docs) {
                            if (error) {
                                console.log(error);
                                process.exit(1);
                            }
                            console.log(docs);
                            Blogs.find({}, function (error, docs) {
                                if (error) {
                                    console.log(error);
                                    process.exit(1);
                                }
                                console.log('\n<----- Consulta general eliminación ------>');
                                console.log(docs);
                                process.exit(0);
                            });
                        }); //fin de la función
                    });
                }); //fin del update por ID
        }); // fin de la funcion para buscar de forma general
    });
});// fin de la funcion para guardar el blog
// fin de la funcion para buscar de forma general
// start up function that creates entries in the Websites database

Meteor.startup(function() {

    if (!Websites.findOne()){
        console.log("No websites yet. Creating starter data.");

        Websites.insert({
            url: "http://www.gold.ac.uk/computing/",
            title: "Goldsmiths Computing Department",
            description: "This is where this course was developed.",
            createdOn: new Date(),
            createdBy: null,
            votePlus: 0,
            voteMinus: 0,
        });

        Websites.insert({
            url: "http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
            title: "University of London",
            description: "University of London International Programme.",
            createdOn: new Date(),
            createdBy: null,
            votePlus: 0,
            voteMinus: 0,
        });

        Websites.insert({
            url: "http://www.coursera.org",
            title: "Coursera",
            description: "Universal access to the world’s best education.",
            createdOn: new Date(),
            createdBy: null,
            votePlus: 0,
            voteMinus: 0,
        });

        Websites.insert({
            url: "http://www.google.com",
            title: "Google",
            description: "Popular search engine",
            createdOn: new Date(),
            createdBy: null,
            votePlus: 0,
            voteMinus: 0,
        });
    }
});

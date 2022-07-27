const { main } = require('./controller/index');

main().catch(err => {
    console.log(err)
});

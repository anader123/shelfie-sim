const getInventory = (request, response) => {
    const db = request.app.get('db'); 
    db.get_inventory()
        .then(products => {
            response.status(200).send(products)
        });
 };

 const createProduct = (request, response) => {
     const db = request.app.get('db');
     const { name, price, img } = request.body; 
     db.create_product([name, price, img])
        .then(() => {
            response.status(200).send('Product has been created')
     })
 };

 const updateProduct = (request, response ) => {
    const db = request.app.get('db'); 
    const { id } = request.params; 
    const { name, price, img } = request.body; 
    db.update_product([name, price, img, id])
        .then(() => {
            response.status(200).send(`Product ${id} has been updated`)
        })
 };

 const deleteProduct = (request, response) => {
     const db = request.app.get('db');
     const { id } = request.params; 
     db.delete_product([id])
        .then(() =>{
            response.status(200).send(`Product ID: ${id} was deleted`)
        })
        .catch(error => console.log('deleteProduct:', error))
 };

module.exports = {
    getInventory,
    createProduct,
    updateProduct,
    deleteProduct 
};
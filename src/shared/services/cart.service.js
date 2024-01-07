class CartService{
    Items = [];

    getItems(){
        return JSON.parse(localStorage.getItem("Items"));
    }
    setItems(entity, name){
        this.Items.push({ entity, name });
        localStorage.setItem('Items', JSON.stringify(this.Items));
    }
}

export default CartService;
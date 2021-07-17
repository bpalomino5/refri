const AddItem = () => {
  return (
    <div style={{ padding: 12 }}>
      <h1>Add Item</h1>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <label for="category">category</label>
        <input name="category" id="category" />

        <label for="name">name</label>
        <input name="name" id="name" />

        <label for="quantity">quantity</label>
        <input name="quantity" id="quantity" />

        <label for="unit">unit</label>
        <input name="unit" id="unit" />

        <button type="submit" style={{ marginTop: 8 }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddItem;

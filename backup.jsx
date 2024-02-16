<div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src="https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/images%2Fc79a4f4e-fa8f-4dc0-9c81-3dbf4a74a729?alt=media&token=3a1e8a2d-c5ff-441a-885d-718c90f2ab2c" alt="Preview" style={{ maxWidth: '100%' }} />
                                <div
                                    style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    cursor: 'pointer',
                                    }}
                                    onClick={handleDelete}
                                >
                                    <CloseCircleOutlined style={{ color: 'red' }} />
                                </div>
                            </div>

// Delete image



let src = "https://firebasestorage.googleapis.com/v0/b/reman-manufacturer.appspot.com/o/images%2Fc79a4f4e-fa8f-4dc0-9c81-3dbf4a74a729?alt=media&token=3a1e8a2d-c5ff-441a-885d-718c90f2ab2c";
      const handleDelete = async() => {
        //* Delete that image with "src" link from firebase
        try {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, src);
            // Delete the file
            deleteObject(desertRef).then(() => {
                // File deleted successfully
                console.log('File deleted successfully');
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.log('Uh-oh, an error occurred!');
            });
          } catch (error) {
            console.error('Error deleting image:', error.message);
          }
      };
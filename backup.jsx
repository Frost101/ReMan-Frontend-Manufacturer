                                <Collapse accordion expandIconPosition="left" expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
                                    {
                                        (categoryList != undefined && categoryList.length !=0) && categoryList.uniqueCategories.map((category, index) => {
                                            return (<Panel header={
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar src="https://i.pinimg.com/474x/8e/bc/e5/8ebce5e43c230715aa6ca5d5bd9b8f21.jpg" size={50} style={{ marginRight: '10px' }} /> {/* Use Avatar component with the image */}
                                                            <span style={{ fontFamily: 'Kalam', fontSize: '40px' }}>{category.CategoryName}</span>
                                                        </div>
                                                    } key={index}>
                                                {
                                                    ( productList != undefined && productList.length != 0) && productList.products.map((product, index) => {
                                                        return (
                                                                (product.CategoryName == category.CategoryName) && (<ProductCard key = {index} product={product} />) 

                                                                );
                                                    })
                                                }
                                            </Panel>);
                                        }
                                        )
                                    }
                                </Collapse>
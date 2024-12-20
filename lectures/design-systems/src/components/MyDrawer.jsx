import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const MyDrawer = (buttonText, title) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        {buttonText}
      </Button>
      <Drawer title={title} onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default MyDrawer;
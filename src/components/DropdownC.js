import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';

/* const style = {
  arrow: {
    border: 'solid black',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: 3
  },
  up: {
    transform: 'rotate(-135deg)',
    webkitTransform: 'rotate(-135deg)'
  },
  down: {
    transform: 'rotate(45deg)',
    webkitTransform: 'rotate(45deg)'
  }
} */


const Example = () => {
  const [dropdownOpen, setDropdownOpen] = useState( false );

  const toggle = () => setDropdownOpen(( prevState ) => !prevState );

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ backgroundColor: '#98A6AD', fontWeight: 'bold', minWidth: 274, minHeight: 40, border: '1px solid #98A6AD', borderRadius: 5 }}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}

      >
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <span style={{ color: 'red !important' }}>LPWAN Server</span>
          <i className="arrow down"></i>
        </div>
      </DropdownToggle>
      <DropdownMenu style={{ backgroundColor: 'black', color: 'white', minWidth: 274 }}>
        <div onClick={toggle}>Matchx</div>
        <div onClick={toggle}>Huawei Tech</div>
        <div onClick={toggle}>Enlink</div>
        <div onClick={toggle}>XY Pool</div>
        <div onClick={toggle}>XY Pool</div>
        <div onClick={toggle}>Seojong Solutech</div>
        <div onClick={toggle}>DU IoT</div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Example;

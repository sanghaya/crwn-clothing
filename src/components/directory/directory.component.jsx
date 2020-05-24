import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component.jsx';
import selectSections from '../../redux/directory/directory.selectors';
import { createStructuredSelector } from 'reselect'; 

import { connect } from 'react-redux';

const Directory = ({sections}) => (
  <div className= 'directory-menu'>
      {
          sections.map(({ id, ...sectionOtherProps }) => (
              <MenuItem key = {id} {...sectionOtherProps}/>
          ))
      }
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectSections
});

export default connect(mapStateToProps)(Directory);
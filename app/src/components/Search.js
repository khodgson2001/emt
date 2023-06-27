/**
 * 
 * @author Kieran Hodgson
 * 
 * @description Search component - displays the search bar
 */

import {Form, FloatingLabel} from 'react-bootstrap';

function Search(props) {
    const onChange = (event) => props.handler(event.target.value);
   
    return (<div>
      <FloatingLabel controlId="floatingInput" label="Search">
        <Form.Control type="text" placeholder="Search" value={props.searchTerm} onChange={onChange} />
      </FloatingLabel>
      </div>
    )
  }
  export default Search;
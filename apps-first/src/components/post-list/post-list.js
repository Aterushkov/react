import React from 'react'; 
import PostListItem from '../post-list-item';
import { ListGroup} from 'reactstrap';
import './post-list.css';

const PostList = ({posts, onDelite, onToggleImportant, onToggleLiked}) => {
  const elements = posts.map((item) => {
    const {id, ...itemProps} =item;
      return (
        <li key={id} classNames='list-group-item'>
           <PostListItem {...itemProps}
           onDelite={() => onDelite(id)}
           onToggleImportant ={() => onToggleImportant(id)}
           onToggleLiked ={() => onToggleLiked(id)}/>
        </li>
      )
  });
  return (
      <ListGroup className='app-list'>
          {elements}
      </ListGroup>
  );
};

export default PostList;
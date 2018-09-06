import _ from 'lodash';
import './styles/style.css';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

function component() {
    //Elements
    var element = document.createElement('div');
    var rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    rootDiv.setAttribute('class', 'chart');//Style
    element.appendChild(rootDiv);
    return element;
  }
  document.body.appendChild(component());

  
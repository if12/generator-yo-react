
import '../assets/index.less';

import <%=appName.firstUpperCase()%> from '../';
import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(<<%=appName.firstUpperCase()%> />, document.querySelector('#<%=appName%>'));

import React from 'react'
import { Switch,Route } from 'react-router-dom';
import OriginalArticleList from './OriginalArticleList';
import OriginalArticleContent from './OriginalArticleContent';


const OriginalArticleSection = ()=>{
    const List = <OriginalArticleList pageSize={10}/>
    return(
        <Switch>
            <Route exact path='/original/all-articles' render={()=>List}></Route>
            <Route path={'/original/all-articles/:oaid'} component={OriginalArticleContent}></Route>
        </Switch>
    )
}

export default OriginalArticleSection;
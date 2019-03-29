import React from 'react'
import { Switch,Route } from 'react-router-dom';
import CollectedArticleContent from './CollectedArticleContent';
import CollectedArticleList from './CollectedArticleList';

const CollectedArticleSection = (props)=>{
    const {path,tag} = props;
    const List = <CollectedArticleList tag={tag} baseUrl={path} showPagnation pageSize={10}></CollectedArticleList>
    return(
        <Switch>
            <Route exact path={path} render={()=>List}></Route>
            <Route path={`${path}/:oaid`} component={CollectedArticleContent}></Route>
        </Switch>
    )
}

export default CollectedArticleSection;
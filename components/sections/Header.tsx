import React from 'react';
import Head from "next/head";
import {connect} from 'react-redux';
import {AppState} from "../../store";
import {SiteState} from "../../store/types/site";

const mapStateToProps = (state: AppState) => {
  return state.site
}

const Header = (site: SiteState) => {
  if(!site){
    return null;
  }
  return (
    <Head>
      <title>{site.title}</title>
      <meta property="og:url" content={site.siteUrl}/>
      <meta property="og:type" content={"profile"}/>
      <meta property="og:title" content={site.title}/>
      <meta property="og:description" content={site?.author?.summary}/>
      <meta property="profile:gender" content={site?.author?.gender}/>
      <meta property="profile:first_name" content={site?.author?.first_name}/>
      <meta property="profile:last_name" content={site?.author?.last_name}/>
      <meta property="profile:username" content={site.siteUrl}/>
      {site.icons.map(({size, path}) => <link key={size} rel="icon" sizes={size} href={path + "?v=1"}/>)}
      <meta property="og:image" content={site.sitePreview}/>
      {site.logo && <link rel={"prefetch"} type={"image"} href={site.logo}/>}
    </Head>
  );
};

export default connect(mapStateToProps)(Header);
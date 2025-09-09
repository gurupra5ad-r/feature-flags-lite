import React from 'react';
import { FlagProvider, useFlag } from './FlagProvider.jsx';

function NewNav(){ return <nav style={{padding:8, border:'1px solid #ddd'}}>New Nav 💡</nav>; }
function OldNav(){ return <nav style={{padding:8, border:'1px solid #ddd'}}>Old Nav</nav>; }

function Page(){
  const showNewNav = useFlag('newNav');
  return <main style={{maxWidth:640, margin:'40px auto'}}>{showNewNav ? <NewNav/> : <OldNav/>}</main>;
}
export default function App(){ return <FlagProvider><Page/></FlagProvider>; }

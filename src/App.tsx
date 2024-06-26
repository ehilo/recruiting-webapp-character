import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { characterApi } from './state/characters/characterApi';
import { CharacterSheet } from './components/characterSheet';
import { Header } from './components/header';
import { useEffect } from 'react';
import { clearAlertMessage, loadCharacters } from './state/characters/characterSlice';

function App() {
  const dispatch = useDispatch();
  
  const { data, isLoading } = characterApi.useGetCharacterDataQuery()

  const { characters, alertMessage } = useSelector((state: RootState) => state.characters);

  const characterList = characters.map(c => <CharacterSheet character={c} key={c.id} />);

  useEffect(() => {
    if(alertMessage !== '') {
      alert(alertMessage);
      dispatch(clearAlertMessage())
    }
  }, [alertMessage, dispatch])

  // I wonder if there's a better way to do this
  useEffect(() => {
    if(data) {
      if (data.statusCode === 200 && data.body.characters !== undefined && data.body.nextCharacterId !== undefined)
        dispatch(loadCharacters(data.body))
    }
  }, [isLoading, dispatch, data])

  if (isLoading) 
    return <div>Loading...</div>;

  return (
    <div className="App">
      <Header />
      {characterList}
    </div>
  );
}

export default App;

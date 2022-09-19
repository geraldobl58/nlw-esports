import { TouchableOpacity, View, Text } from 'react-native';

import { GameController } from 'phosphor-react-native';

import { DuoInfo } from '../DuoInfo';

import { THEME } from '../../theme';

import { styles } from './styles';


export interface DuoCardProps {
  id: string,
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearPlaying: number,
}

interface DuoProps {
  data: DuoCardProps
  onConnect: () => void
}

export function DuoCard({ data, onConnect }: DuoProps) {
  
  return (
    <View style={styles.container}>
      <DuoInfo 
        label="Nome"
        value={data.name}
      />
      <DuoInfo 
        label="Tempo de jogo"
        value={`${data.yearPlaying} anos`}
      />
      <DuoInfo 
        label="Disponilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo 
        label="Chamada de áudio"
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController 
          size={20}
          color={THEME.COLORS.TEXT}
        />
        <Text style={styles.butotnTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
import { useEffect, useState } from 'react';

import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native'

import { Entypo } from '@expo/vector-icons'

import { SafeAreaView } from 'react-native-safe-area-context'

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

import { GameParams } from '../../@types/navigation';

import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';

export function Game() {
  const route = useRoute()

  const navigation = useNavigation()

  const game = route.params as GameParams

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('johndoe#ghost')

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.15.13:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => {
        setDiscordDuoSelected(data.discord)
      })
  } 

  useEffect(() => {
    fetch(`http://192.168.15.13:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => {
        setDuos(data)
      })
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name="chevron-thin-left"
              size={20}
              color={THEME.COLORS.CAPTION_300}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />

        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar"
        />

        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => getDiscordUser(item.id)} 
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContainer]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              N??o existe ??nuncio publicado
            </Text>
          )}
        />

        <DuoMatch 
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />

      </SafeAreaView>
    </Background>
  );
}
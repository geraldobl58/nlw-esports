import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: THEME.COLORS.SHAPE,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginRight: 16
  },
  button: {
    width: '100%',
    height: 36,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  butotnTitle: {
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,
    marginLeft: 8
  }
});
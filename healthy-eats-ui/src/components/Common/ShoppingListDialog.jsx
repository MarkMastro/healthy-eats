import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'
import { useState } from 'react';
import HealthyEatsApiService from '../../services/healthyEatsApiService';
import { blue, grey } from '@mui/material/colors';

ShoppingListDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function ShoppingListDialog(props) {

  const { onClose, open, recipeIngredients, setIsShoppingListDialogOpen } = props;
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checkedIngredients.indexOf(value);
    const newChecked = [...checkedIngredients];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedIngredients(newChecked);
  };

  const submitItemsToList = () => {
    setIsShoppingListDialogOpen(false);
    const shoppingList = recipeIngredients
      .filter(i => checkedIngredients.some(ch => ch === i.id))
      .map(i => {
        return {
          id: i.id,
          userId: sessionStorage.sessionUserId,
          ingredientId: i.id,
          ingredientName: i.name,
          ingredientImage: i.image,
          amount: i.amount,
          unit: i.unit,
          isChecked: 0
        }
      });
    HealthyEatsApiService.createShoppingList(shoppingList);
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>Shopping List</DialogTitle>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {recipeIngredients.map((ingredient) => {
          const labelId = `checkbox-list-secondary-label-${ingredient.id}`;
          return (
            <ListItem sx={{ bgcolor: grey[100] }}
              key={ingredient.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(ingredient.id)}
                  checked={checkedIngredients.indexOf(ingredient.id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${ingredient.name}`}
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button sx={{ color: 'text.primary', fontWeight: 'bold' }} onClick={submitItemsToList}>
        Submit
      </Button>
    </Dialog >
  );
}
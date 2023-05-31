import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/rule">
        <Translate contentKey="global.menu.entities.rule" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/profile">
        <Translate contentKey="global.menu.entities.profile" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ingredient">
        <Translate contentKey="global.menu.entities.ingredient" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/categorie">
        <Translate contentKey="global.menu.entities.categorie" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/recipe">
        <Translate contentKey="global.menu.entities.recipe" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/comments">
        <Translate contentKey="global.menu.entities.comments" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;

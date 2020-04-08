/* eslint-disable no-console */
import { library } from '@fortawesome/fontawesome-svg-core';
import fontawesome from '@fortawesome/fontawesome';
import {
  faKey,
  faAt,
  faPhone,
  faTrash,
  faEdit,
  faFlagCheckered,
  faUndoAlt,
  faCalendarAlt,
  faArrowRight,
  faUser,
  faPlus,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

const loadIcons = () => {
  library.add(
    faKey,
    faAt,
    faPhone,
    faTrash,
    faEdit,
    faFlagCheckered,
    faUndoAlt,
    faCalendarAlt,
    faArrowRight,
    faArrowRight,
    faUser,
    faPlus,
    faPlusCircle
  );
  // console.log(`faKey: ${fontawesome.icon(faKey).abstract}`);
  // console.log(`faPlus: ${fontawesome.icon(faPlus).abstract}`);
  console.log(fontawesome.icon(faKey).abstract);
  console.log(fontawesome.icon(faPlus).abstract);

};
export default loadIcons;

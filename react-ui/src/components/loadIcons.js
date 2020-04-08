import { library } from '@fortawesome/fontawesome-svg-core';
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
    faUser
  );
};
export default loadIcons;

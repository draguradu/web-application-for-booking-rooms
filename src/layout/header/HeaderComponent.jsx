import React from 'react';
import styles from "./Header.module.scss";
import upt from '../../assets/images/upt.png';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import { useGlobalStateContext } from 'contexts';
import { Roles } from 'utils/enums/Roles';
import { CheckAuthorization } from 'routing/routing-manager';

function HeaderComponent(props) {
    const {onLogout} = props;
    const { globalState } = useGlobalStateContext();

    return (
        <div className={styles.header}>
            <img className={styles.img} src={upt} alt={upt} />
            <div className={styles.menu}>
                <Link className={styles.itemMenu} to="/exams">My exams</Link>
                <CheckAuthorization authorizatedRoles={[Roles.Admin, Roles.HeadOfYear]}>
                    <Link className={styles.itemMenu} to="/form">Schedule exam</Link>
                </CheckAuthorization>
                <CheckAuthorization authorizatedRoles={[Roles.Admin]}>
                    <Link className={styles.itemMenu} to="/admin">Data management</Link>
                </CheckAuthorization>
            </div>
            <ExitToAppIcon className={styles.logout} onClick={() => onLogout()} />
            <p className={styles.profile}>
              User: <span className={styles.value}>{globalState.user.name}</span><br />
              {globalState.user.specialization ? 
                <React.Fragment>
                  <span>Specialization: </span>
                  <span className={styles.value}>{globalState.user.specialization.name}</span>
                  <br />
                </React.Fragment>
              :
                ""
              }
              {globalState.user.yearsOfStudy > 0 ? 
                <React.Fragment>
                  <span>Year of study: </span>
                  <span className={styles.value}>{globalState.user.yearsOfStudy}</span>
                </React.Fragment>
              :
                ""
              }
            </p>
        </div>
    )
}

HeaderComponent.propTypes={
  onLogout: PropTypes.func,
}

export default HeaderComponent;

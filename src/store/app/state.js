import dashboard from '../../assets/dashboard.svg'
import dashboardw from '../../assets/dashboardw.svg'
import notification from '../../assets/notification.svg'
import notificationw from '../../assets/notificationw.svg'
import marking from '../../assets/marking.svg'
import markingw from '../../assets/markingw.svg'
import help from '../../assets/help.svg'
import helpw from '../../assets/helpw.svg'
import contactus from '../../assets/contactus.svg'
import contactusw from '../../assets/contactusw.svg'

export default function () {
  return {
    headerTitle: null,
    products: [],
    SIDE_NAV_ITEMS: [{
      id: 1,
      name: 'Revenue Analysis',
      activeIcon: dashboardw,
      inActiveIcon: dashboard,
      active: true,
      link: '/revenue-analysis'

    },
    {
      id: 2,
      name: 'Inventry Setup',
      activeIcon: notificationw,
      inActiveIcon: notification,
      active: false,
      link: '/inventry-setup'
    },
    {
      id: 3,
      name: 'Product Registration',
      activeIcon: markingw,
      inActiveIcon: marking,
      active: false,
      link: '/product-registration'
    },
    {
      id: 4,
      name: 'Help',
      activeIcon: helpw,
      inActiveIcon: help,
      active: false,
      link: ''
    },
    {
      id: 5,
      name: 'Contact us',
      activeIcon: contactusw,
      inActiveIcon: contactus,
      active: false,
      link: ''
    }

    ]
  }
}

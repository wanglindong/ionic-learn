import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MorePage } from '../more/more';
import { ChatPage } from '../chat/chat';
import { DiscoveryPage } from '../discovery/discovery';
import { NotificationPage } from '../notification/notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationPage;
  tabMore = MorePage;

  constructor() {

  }
}

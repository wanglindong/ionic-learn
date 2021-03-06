import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage } from '../login/login';
import { UserPage } from '../user/user';
import { UserdatalistPage } from '../userdatalist/userdatalist';
import { ScanPage } from '../scan/scan';
import { SettingsProvider } from '../../providers/settings/settings';
import { BaseUI } from '../../common/baseui';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;

  headface: string;
  userinfo: string[];
  selectedTheme:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public settings:SettingsProvider
  ) {
    super();
    settings.getActiveTheme().subscribe(val=>this.selectedTheme = val)
  }

  presentModal() {
    const modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调
    modal.onDidDismiss(() => {
      this.loadUserPage();
    });
    modal.present();
  }

  ionViewDidLoad() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.userinfo = userinfo;
              this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf(); //给资源文件添加后缀，去除缓存
              this.notLogin = false;
              this.logined = true;
              loading.dismiss();
            });

      }
      else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }
  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }

  gotoDataList(type) {
    this.navCtrl.push(UserdatalistPage, { "dataType": type });
  }

  /**
   *跳转到扫描二维码页面,加上"animate":false参数是为了
   *相机能在屏幕中显示，如果不加相机出不来
   * "animate"默认为true
   * 
   * @memberof MorePage
   */
  gotoScanQRCode(){
    this.navCtrl.push(ScanPage,null,{"animate":false});
  }

  toggleChangeTheme(){
      if(this.selectedTheme === 'dark-theme'){
          this.settings.setActiveTheme('light-theme');
      }
      else{
        this.settings.setActiveTheme('dark-theme');
      }
  }
}

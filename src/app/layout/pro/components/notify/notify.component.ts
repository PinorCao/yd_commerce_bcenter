import {Component} from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import {NzMessageService} from 'ng-zorro-antd';
import {NoticeItem, NoticeIconList} from '@delon/abc';
import {NotificationServiceProxy} from '@shared/service-proxies/service-proxies';

/**
 * 菜单通知
 */
@Component({
  selector: 'layout-pro-notify',
  templateUrl: './notify.component.html'
})
export class LayoutProWidgetNotifyComponent {
  data: NoticeItem[] = [
    {
      title: '通知',
      list: [],
      emptyText: '你已查看所有通知',
      emptyImage:
        'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
      clearText: '清空通知'
    }
  ];
  count = 5;
  loading = false;

  constructor(private msg: NzMessageService, private notificationSvc: NotificationServiceProxy) {
  }

  updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = {...item};
      if (newItem.datetime)
        newItem.datetime = distanceInWordsToNow(item.datetime, {
          locale: (window as any).__locale__
        });
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type).list.push(newItem);
    });
    return data;
  }

  loadData() {
    if (this.loading) return;
    this.loading = true;
    const data = [];
    this.notificationSvc.getUserNotifications(undefined, 10, 0).subscribe(res => {
      console.log(res);
      this.count = res.unreadCount;
      res.items.forEach(item => {
        data.push({
          id: item.id,
          avatar: '',
          title: item.notification.notificationName,
          description: item.notification.data.properties.Message,
          datetime: item.notification.creationTime,
          type: '通知',
          read: item.state === 1 ? true : false
        });
      });
      this.data = this.updateNoticeData(data);
      this.loading = false;
    });
  }

  clear(type: string) {
    this.notificationSvc.setAllNotificationsAsRead().subscribe(res => {
      this.msg.success(`清空了 ${type}`);
    });
  }

  select(res: any) {
    if (!res.item.read) {
      this.notificationSvc.setNotificationAsRead(res.item).subscribe(res);
    }
  }
}

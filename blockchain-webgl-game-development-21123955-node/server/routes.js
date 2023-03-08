//v7 imports
import user from "./api/v1/controllers/user/routes";
import staticContent from "./api/v1/controllers/static/routes";
import faqContent from "./api/v1/controllers/static/routes";
import announcementContent from "./api/v1/controllers/static/routes"; 
import admin from './api/v1/controllers/admin/routes';
import subAdmin from './api/v1/controllers/admin/routes';
import collection from './api/v1/controllers/collection/routes';
import nft from './api/v1/controllers/nft/routes';
import activity from './api/v1/controllers/activity/routes';
import market from './api/v1/controllers/blackMarket/routes';



/**
 *
 *
 * @export
 * @param {any} app
 */

export default function routes(app) {

  app.use("/api/v1/user", user);  
  app.use('/api/v1/static', staticContent);
  app.use('/api/v1/faq', faqContent);
  app.use('/api/v1/announcement',announcementContent);
  app.use('/api/v1/admin', admin);
  app.use('/api/v1/subAdmin',subAdmin)
  app.use('/api/v1/collection', collection);
  app.use('/api/v1/nft', nft);
  app.use('/api/v1/activity', activity);
  app.use('/api/v1/market', market);
  // app.use('/api/v1/notification',notification);




  return app;
}

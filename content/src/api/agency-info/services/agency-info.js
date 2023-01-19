'use strict';

/**
 * agency-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::agency-info.agency-info');

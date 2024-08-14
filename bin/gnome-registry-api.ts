#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../lib/api-stack';
import { DatabaseStack } from '../lib/database-stack';
import { ClientVpnStack } from '../lib/client-vpn-stack';

const app = new cdk.App();
const db = new DatabaseStack(app, 'DatabaseStack', {});
new ApiStack(app, 'ApiStack', {
  database: db.database,
  vpc: db.vpc,
  rootUserSecret: db.rootUserSecret,
});
new ClientVpnStack(app, 'ClientVpnStack', {
  vpc: db.vpc,
});

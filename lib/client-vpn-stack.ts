import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

interface Props extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class ClientVpnStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const clientCertToken = StringParameter.valueForStringParameter(this, 'client-cert-parameter');
    const serverCertToken = StringParameter.valueForStringParameter(this, 'server-cert-parameter');

    // Only use this when needed
    // const endpoint = new ec2.ClientVpnEndpoint(this, 'ClientVpnEndpoint', {
    //   vpc: props.vpc,
    //   cidr: "10.16.0.0/22",
    //   logging: false,
    //   splitTunnel: true,
    //   selfServicePortal: false,
    //   vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    //   clientCertificateArn: clientCertToken,
    //   serverCertificateArn: serverCertToken,
    // });
 }
}

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from 'react-native';
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";
import { connect } from 'react-redux'
import { CONNECTING_REQUEST } from '../redux/constants/connectionConstant'
import { connection } from '../redux/actions/connectionActions'

var { height, width } = Dimensions.get('window');
export class Print extends Component {

  _listeners = [];

  constructor(props) {
    super(props);
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: true,
      // boundAddress: '',
      debugMsg: '',
      // name: ''
    }
  }

  componentDidMount() {
    this.props.hitRequest
    BluetoothManager.isBluetoothEnabled().then((enabled) => {
      this.setState({
        bleOpend: Boolean(enabled),
        loading: false
      })
    }, (err) => {
      err
    });

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        (rsp) => {
          this._deviceAlreadPaired(rsp)
        }));
      this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
        this._deviceFoundEvent(rsp)
      }));
      this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        this.props.hitman(
          {
            info: {
              boundAddress: '',
              name: '',
            }
          })
        // this.setState({
        //   name: '',
        // });
      }));
    } else if (Platform.OS === 'android') {
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
          this._deviceAlreadPaired(rsp)
        }));
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
          this._deviceFoundEvent(rsp)
        }));
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST, () => {
          this.props.hitman(
            {
              info: {
                boundAddress: '',
                name: '',
              }
            })
          // this.setState({
          //   name: '',
          // });
        }
      ));
      this._listeners.push(DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
          ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
        }
      ))
    }
  }

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof (rsp.devices) == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {
      }
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared
      });
    }
  }

  _deviceFoundEvent(rsp) {//alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof (rsp.device) == "object") {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {//alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity key={new Date().getTime() + i} style={styles.wtf} onPress={() => {
            this.setState({
              loading: true
            });
            BluetoothManager.connect(row.address)
              .then((s) => {
                this.props.hitman(
                  {
                    info: {
                      boundAddress: row.address,
                      name: row.name || "UNKNOWN"
                    }
                  });
                this.setState({
                  loading: false,
                })
              }, (e) => {
                this.setState({
                  loading: false
                })
                alert("Perangkat tidak terjangkau");
              })

          }}><Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
            style={styles.address}>{row.address}</Text></TouchableOpacity>
        );
      }
    }
    return items;
  }

  render() {
    const { boundAddress, navigation, name } = this.props
    console.log(name);
    console.log(boundAddress);
    return (
      <ScrollView style={styles.container}>
        <View>
          <Switch value={this.state.bleOpend} onValueChange={(v) => {
            this.setState({
              loading: true
            })
            if (!v) {
              BluetoothManager.disableBluetooth().then(() => {
                this.setState({
                  bleOpend: false,
                  loading: false,
                  foundDs: [],
                  pairedDs: []
                });
              }, (err) => { alert(err) });

            } else {
              BluetoothManager.enableBluetooth().then((r) => {
                var paired = [];
                if (r && r.length > 0) {
                  for (var i = 0; i < r.length; i++) {
                    try {
                      paired.push(JSON.parse(r[i]));
                    } catch (e) {
                      //ignore
                    }
                  }
                }
                this.setState({
                  bleOpend: true,
                  loading: false,
                  pairedDs: paired
                })
              }, (err) => {
                this.setState({
                  loading: false
                })
                alert(err)
              });
            }
          }} />
          <View style={{ marginBottom: 8 }}>

            <Button disabled={this.state.pairedDs.length !== 0 && true} onPress={() => {
              this._scan();
            }} title="Scan" />
          </View>
        </View>
        <Text style={styles.title}>Terhubung: <Text style={{ color: "blue" }}>{!name ? 'No Devices' : name}</Text></Text>
        <Text style={styles.title}>Ditemukan (Ketuk untuk menghubungkan):</Text>
        {/* {this.state.loading ? (<ActivityIndicator animating={true} />) : null} */}
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: '#7c8f82' }}>
          {
            this._renderRow(this.state.foundDs)
          }
        </View>
        <Text style={styles.title}>Dipasangkan:</Text>
        {/* {this.state.loading ? (<ActivityIndicator animating={true} />) : null} */}
        <View style={{ flex: 1, flexDirection: "column", backgroundColor: '#7c8f82', padding: 8 }}>
          {
            this._renderRow(this.state.pairedDs)
          }


        </View>
        <View style={{ marginTop: 8, borderRadius: 8, backgroundColor: '#2196F3', height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Order', { loading: this.state.loading })}>
            <Text style={{ fontWeight: 'bold' }}> Go To Home </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _scan() {
    this.setState({
      loading: true
    })
    BluetoothManager.scanDevices()
      .then((s) => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found);//@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false
        });
      }, (er) => {
        this.setState({
          loading: false
        })
        alert('error: Perangkat tidak terjangkau JSON.stringify(er)');
      });
  }


}
const mapStateToProps = (state) => {
  return {
    boundAddress: state.connectionRequest.boundAddress,
    name: state.connectionRequest.name,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hitRequest: () => dispatch({ type: CONNECTING_REQUEST }),
    hitman: (info) => dispatch(connection(info))

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Print)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6DC3BF',
    padding: 10
  },

  title: {
    width: width,
    backgroundColor: "#7c8f82",
    color: "#232323",
    paddingLeft: 8,
    paddingVertical: 4,
    textAlign: "left",
  },
  wtf: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    flex: 1,
    textAlign: "left"
  },
  address: {
    flex: 1,
    textAlign: "right"
  }
});

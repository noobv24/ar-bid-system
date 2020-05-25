import React from "react";
import Arweave from "arweave/web";
import {
  signAndDeployTransaction,
  getAddressAndBalance,
  openNotificationWithIcon,
} from "./utils/arweaveUtils";

import { Layout, Card, Modal, Button, Row, Col, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./App.css";
const { Header, Content } = Layout;
const { TextArea } = Input;
const { Meta } = Card;
const ArweaveUtils = require("arweave/node/lib/utils");

const ReadWalletFile = (walletFile) => {
  const readAsDataURL = (walletFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort()
        reject()
      }
      reader.addEventListener("load", () => {resolve(reader.result)}, false)
      reader.readAsText(walletFile)
    })
  }
  return readAsDataURL(walletFile);
}

const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  timeout: 20000,
  logging: false,
});
const data = [
  {
    img:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387017939806-10.jpg",
    img2:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387017939806-10.jpg",
    html: `This is the highest valued ceramic vase ever. Its sophisticated, clear and harmonious patterns are hailed as the pinnacle. The royal imprint shows that it was born in the reign of Qianlong. An explorer bought it when he went to China, took it back to England, then sold it again. Initially, it cost only $ 1,000 because it was suspected of being a copy, but after authenticating as "standard" goods, the value immediately jumped to $ 1 million. After many hands, the vase currently costs $ 80.2 million.`,
    title: "Chinese Vase",
    description: "Highest Bid",
    expireDate: "2020-07-28T00:00:00",
  },
  {
    img:
      "https://image.invaluable.com/housePhotos/Fashionstrada/23/672923/H19501-L209685651.jpg",
    title: "Estate Jewelry Auctioneer",
    img2:
      "https://image.invaluable.com/housePhotos/Fashionstrada/23/672923/H19501-L209685651.jpg",
    html: `7.24 CTW Natural Aquamarine And Diamond Ring In 14K Solid Yellow Gold
    Manufacturer's Suggested Retail Price: $ 6550.00
    Stamped: 14K
    Ring Size: 6.25 Total Ring Weight: 5.5 Grams
    Diamond Weight:
    Total Natural diamond weight is 1.06carat.
    VS2-SI1 clarity / F-G color
    Gemstone Weight:
    Total Natural Aquamarine Weight is 6.18ctw (Measures: 13.75x10.08mm)
    Face Measures: 18.78x15.63mm`,
    description: "Highest Bid",
    expireDate: "2020-07-01T00:00:00",
  },
  {
    img:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158057-149387017976825-goddard-and-townsend-seceretary1.jpg",
    title: "Goddard Townsend ",
    img2:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158057-149387017976825-goddard-and-townsend-seceretary1.jpg",
    html: `The most famous pieces of furniture made by the leading cabinetmaking families of Newport, the Townsends and the Goddards, are the desks and bookcases with block fronts and six or nine shells. On these, the tripartite division of the blocked drawer fronts, terminating in large shells on the fall front, is continued upward on the bookcase unit in three hinged doors covering an array of cubbyholes. These monumental work stations were also symbols of their owners' business achievements. Thus, for example, each of the four Brown brothers, the leading merchants in late-eighteenth-century Providence, Rhode Island, had one.`,
    description: "Highest Bid",
    expireDate: "2020-07-01T00:00:00",
  },
  {
    img:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158057-14938701795146-princess-katherine-henckel.jpg",
    img2:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158057-14938701795146-princess-katherine-henckel.jpg",
    html: `Emerald and Diamond Tiara Commissioned by German Prince Guido Henckel von Donnersmarck, he gave this tiara as a gift to his second wife Katherine in the year 1900.`,
    title: "Royal Jewelry",
    description: "Highest Bid",
    expireDate: "2020-07-01T00:00:00",
  },
  {
    img:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-14938701791831-most-impressive-items-ever-auctioned-by-christies-limited-edition-world-i-lobo-you4.jpg",
    title: "Badminton",
    img2:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-14938701791831-most-impressive-items-ever-auctioned-by-christies-limited-edition-world-i-lobo-you4.jpg",
    html: `
    Badminton cabinets are the second furniture in the top 10. The Duke of Beaufort (England), Henry Somerset-Scudamore asked to close the cabinet in 1726. 30 professional workers took up to 6 years to please the duke. The cupboard is named after the house it is located in, the Badminton Mansion is also owned by the duke. Collector Prinz Hans-Adam II bought it for display in the Lichtenstein museum.`,
    description: "Highest Bid",
    expireDate: "2020-08-01T00:00:00",
  },
  {

    img:
      "https://66.media.tumblr.com/tumblr_mdxsr36r321rrjmgoo2_1280.jpg",
    title: "Napoleon’s Sword",
    img2:
      "https://66.media.tumblr.com/tumblr_mdxsr36r321rrjmgoo2_1280.jpg",
    html: `In 1799, Napoleon Bonaparte became the military and political leader of France after staging a coup d’état.  Five years later the French Senate proclaimed him emperor.  In the first decade of the 19th century Napoleon and the French Empire were engaged in conflict and war with every major European power. Historians regard Napoleon as a military genius and a man who made strong contributions to the operational art of war.`,
    description: "Highest Bid",
    expireDate: "2020-07-01T00:00:00",
  },
  {
    img:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387017931691-60142cd0ccae4b29fd45b63285884e7c.jpg",
    img2:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387017931691-60142cd0ccae4b29fd45b63285884e7c.jpg",
    html: `The vase has pink and turquoise phoenix pattern alternating. The Chinese characters indicate that it was made from the time of the Emperor Qianlong (about the 16th century). Its two handles are two big dragons and a "like" symbol to bring luck.`,
    title: "Ceramic vase",
    description: "Highest Bid",
    expireDate: "2020-07-28T00:00:00",
  },
  {
    img:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387017958988-ming-dynasty-gold-tripod-vessel.jpg",
    img2:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387017958988-ming-dynasty-gold-tripod-vessel.jpg",
    html: `Currently in the world only 8 pcs of the same type. Through examination of this artifact dates back to the reign of Tuyen Duc King (reigned in about 1399-1435). This is also the time when China's industry and arts reach its peak. This bowl is made of 18K gold, carved with dragons and pearls and many kinds of gems like rubies. It went to a Western owner at the auction in Hong Kong.`,
    title: "Crystal Glassware",
    description: "Highest Bid",
    expireDate: "2020-08-25T00:00:00",
  },
  {
    img:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387046568523-leonardo-da-vincis-codex-leicester.jpg",
    img2:
      "https://anh.24h.com.vn/upload/2-2017/images/2017-05-07/1494158058-149387046568523-leonardo-da-vincis-codex-leicester.jpg",
    html: `The Codex Leicester is a collection of scientific writings by Leonardo da Vinci. The Codex is named after Thomas Coke, later credited to Earl of Leicester.`,
    title: "Codex Leicester",
    description: "Highest Bid",
    expireDate: "2020-08-15T00:00:00",
  },
];
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class App extends React.Component {
  state = {
    loading: false,
    loadWallet: false,
    walletData: "",
    creatingTx: false,
    arwAddress: "",
    arwBalance: 0,
    mess: "No one bid Yet",
    selectedIndex: 0,
    times: [],
    bidTxs: [],
    highestBids: [],
    itemTag: "",

    newBalance: 0,
    selected: null,
    openModel: false,
    openLogin: false,
  };

  handleCloseTxModal = () => this.setState({ modalTx: false });
  handleCloseModal = () => this.setState({ openModel: false });
  handleCloseLogin = () => this.setState({ openLogin: false });

  handleFileUpload = async (e, nameEvent) => {
    const rawWallet = await this.readWallet(e.target.files[0]);
    this.setState({ [nameEvent]: rawWallet });
  };

  readWallet = (walletFile) => {
    const readAsDataURL = (walletFile) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => {
          reader.abort();
          reject();
        };
        reader.addEventListener(
          "load",
          () => {
            resolve(reader.result);
          },
          false
        );
        reader.readAsText(walletFile);
      });
    };
    return readAsDataURL(walletFile);
  };

  confirmLoadWallet = async () => {
    try {
      this.setState({ loading: true });
      const walletData = this.state.loadWalletData;
      let walletObj = JSON.parse(walletData);
      const { address, balance } = await getAddressAndBalance(walletObj);

      this.setState({
        loading: false,
        loadWallet: true,
        walletData: walletObj,
        arwAddress: address,
        arwBalance: balance,
        loadWalletData: "",
        openLogin: false,
      });
    } catch (err) {
      this.setState({ loading: false });
      openNotificationWithIcon(
        "error",
        "Error",
        "Something wrong, check your file key"
      );
    }
  };

  WalletUpload = async(e) => {  
    try {
      this.setState({loading:true})
      const rawWallet = await ReadWalletFile(e.target.files[0])    
      let walletObj = JSON.parse(rawWallet);
      const { address, balance } = await getAddressAndBalance(walletObj);

      this.setState({
        loading: false,
        loadWallet: true,
        walletData: walletObj,
        arwAddress: address,
        arwBalance: balance,
        loadWalletData: "",
      });
      return;
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
      openNotificationWithIcon(
        "error",
        "Error Message!",
        "Something wrong, check your file key"
      );
    }

  }

  getBestBidAmount = async (item) => {
    let txids = await this.getTxList(item);
    if (txids.length < 1)
      return { amount: 0.001, mess: this.state.mess };
    let HighestBidAmount = 0;
    let txid;
    for (let i = 0; i < txids.length; i++) {
      let response = await fetch(`https://arweave.net/tx/` + txids[i] + `/data`);
      let responseText = await response.text();
      let nextBidAmount = ArweaveUtils.b64UrlToString(responseText);
      console.log(nextBidAmount);
      if (nextBidAmount > HighestBidAmount) {
        HighestBidAmount = nextBidAmount;
        txid = txids[i];
      }
    }

    return { amount: HighestBidAmount, mess: txid };
  }

  getTxList = async (item) => {
    try {
      const query = {
        op: "or",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: "012345679"
        },
        expr2: {
          op: "and",
          expr1: {
            op: "equals",
            expr1: "App",
            expr2: "Auction"
          },
          expr2: {
            op: "equals",
            expr1: "Item",
            expr2: item
          }
        }
      }
      const result = await arweave.arql(query);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async componentDidMount() {
    const highestBids = []
    const bidtxs = []
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].title)
      const highestBid = await this.getBestBidAmount(data[i].title);
      highestBids.push(highestBid.amount);
      bidtxs.push("Transaction: " + highestBid.mess);
    }
    setInterval(this.countDown(), 1000);

    this.setState({ highestBids: highestBids, bidTxs: bidtxs })
  }

  countDown = () => {
    let times = []
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].expireDate)
      let seconds = ((new Date(data[i].expireDate)) - (new Date())) / 1000
      let days = seconds / 84600
      let time = Math.round(days) + " days ";
      console.log(time)
      times.push(time);
    }

    this.setState({ times: times })
  }

  change = (e, name) => {
    this.setState({
      [name]: e,
    });
  };

  OpenConfirm = async (item, bidAmount) => {
    let walletData = this.state.walletData;
    let transactionBuid = await arweave.createTransaction({
      target: "YZMWNRhKKwCQ7SGGKMm1lop2Gkog-LTMbzPSx7aaK70",
      quantity: arweave.ar.arToWinston('0.01'),
      data: bidAmount,
    }, walletData);

    transactionBuid.addTag('App', "Auction");
    transactionBuid.addTag('Item', item);
    console.log(transactionBuid)
    let fee = arweave.ar.winstonToAr(transactionBuid.reward);
    this.setState({ openModel: true, itemTag: item, transactionBuid: transactionBuid, txFee: fee });
  }

  confirmTransferCrypto = async () => {
    try {
      this.setState({ txRunning: true });
      let walletData = this.state.walletData;
      let transactionBuid = this.state.transactionBuid;
      let item = this.state.itemTag;

      const response = await signAndDeployTransaction(transactionBuid, walletData);
      console.log(response);
      if (response.data === "OK" && response.status === 200) {
        this.setState({
          creatingTx: false,
          openModel: false,
          txRunning: false,
        });
        openNotificationWithIcon(
          "success",
          "Success Message!",
          "You bid " + item + " Successfully"
        );
        return;
      }
      openNotificationWithIcon("error", "Error Message!", "Transaction Failed");
      this.setState({ txRunning: false, cryptoTxPass: "", creatingTx: false, openModel: false  });
    } catch (err) {
      console.log(err);
      openNotificationWithIcon("error", "Error Message!", "Transaction Failed");
      this.setState({ txRunning: false, cryptoTxPass: "", creatingTx: false, openModel: false  });
    }
  };

  render() {
    const {
      loading,
      selected,
      openModel,
      openLogin,
      creatingTx,
      walletData,
      arwAddress,
      arwBalance,
      bidAmount,
    } = this.state;
    const checkForm =
      !bidAmount;
    return (
      <Layout className="font-default">
        <Header className="header">
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1 className="title"
                onClick={() => {
                  this.setState({ selected: null });
                }}
                style={{
                  cursor: "pointer"
                }}
            >AR AUCTION SYSTEM</h1>
            {!walletData ? (
              <div>
                <label for="hidden-new-file" 
                  style={{
                    border: "1px solid #ccc",
                    display: "inline-block",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "15px",
                  }}
                >
                  <i class="fa fa-cloud-upload"></i> Login To Bid
                </label>
                <input type="file" onChange={ e => this.WalletUpload(e)} id="hidden-new-file" style={{display: "none"}}/>
              </div>
            ) : (
                <div style={{ marginRight: "10%", fontSize: "15px" }}>
                  <p>
                    {arwAddress}: {arwBalance}
                  </p>
                </div>
              )}
          </div>
        </Header>
        <Content
          className="container"
          style={{
            minHeight: "calc(100vh - 94px)",
            overflow: "initial",
          }}
        >
          <Modal
            title="BID CONFIRMATION"
            onCancel={this.handleCloseModal}
            visible={openModel}
            footer={[
              <Button
                key="back"
                style={{
                  paddingLeft: "60px",
                  paddingRight: "60px",
                  marginRight: "20px",
                }}
                onClick={this.handleCloseModal}
              >
                No
              </Button>,
              <Button
                key="submit"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
                loading={creatingTx}
                disabled={creatingTx || checkForm}
                onClick={this.confirmTransferCrypto}
              >
                Yes
              </Button>,
            ]}
          >
          <div>
            <p>
              <strong>Are you sure to bid: </strong> {data[this.state.selectedIndex].title}
            </p>
          </div>
          </Modal>
          <Modal
            title="Login to Arweave"
            style={{ textAlign: "center" }}
            onCancel={this.handleCloseLogin}
            visible={openLogin}
            footer={[
              <Button
                key="back"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
                onClick={this.handleCloseLogin}
              >
                No
              </Button>,
              <Button
                key="submit"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
                loading={loading}
                onClick={this.confirmLoadWallet}
              >
                Yes
              </Button>,
            ]}
          >
            <input
              style={{ paddingBottom: 10 }}
              type="file"
              accept=".json"
              onChange={(e) => {
                this.handleFileUpload(e, "loadWalletData");
              }}
            />
          </Modal>
          {selected && (
            <div>
              <Row>
                <Col span={18}>
                  <img
                    alt=''
                    src={selected.img2}
                    style={{ width: "80%", height: "auto" }}
                  ></img>
                </Col>
                <Col span={6}>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontSize: "20px" }}>
                      <strong style={{ fontSize: "20px" }}>
                        {selected.title}
                      </strong>
                    </p>
                    <p>{selected.html}</p>
                    <p style={{ fontSize: "20px" }}>
                      <strong style={{ fontSize: "15px" }}>
                        Highest Bid:
                      {this.state.highestBids[this.state.selectedIndex]}
                      </strong>
                      <br></br>
                      <strong style={{ fontSize: "15px" }}>
                        {this.state.bidTxs[this.state.selectedIndex]}
                      </strong>
                    </p>
                    <strong style={{ fontSize: "20px" }}>
                      <Input
                        onChange={(e) => {
                          this.change(e.target.value, "bidAmount");
                        }}
                        placeholder="0.1 AR"
                      />
                    </strong>
                    <Button
                      onClick={() => {
                        if (!walletData) {
                          openNotificationWithIcon(
                            "error",
                            "Error",
                            "Please login your wallet!"
                          );
                        } else {
                          this.OpenConfirm(selected.title, this.state.bidAmount)
                        }
                      }}
                      style={{ marginTop: "30px" }}
                      size={"large"}
                    >
                      Place a bid
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
          {!selected && (
            <Row
              gutter={[16, 8]}
              justify={"space-between"}
              type="flex"
              align="middle"
            >
              {data.map((item, index) => {
                return (
                  <Col
                    span={4}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    key={index}
                    style={{ display: "flex" }}
                  >
                    <Card
                      onClick={() => {
                        this.setState({ selected: item, selectedIndex: index });
                      }}
                      bordered={false}
                      hoverable
                      className="card-item"
                      cover={<img alt="example" src={item.img} />}
                    >
                      <Meta
                        style={{ textAlign: "center" }}
                        title={item.title}
                        description={item.description}
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          color: "#222",
                        }}
                      >
                        <span style={{ fontSize: "medium" }}>
                          {this.state.highestBids[index]} AR
                        </span>
                        <br></br>
                        <span style={{ fontSize: "medium" }}>
                          Time left {this.state.times[index]}
                        </span>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Content>
      </Layout>
    );
  }
}

export default App;

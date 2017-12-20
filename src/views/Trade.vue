<template>
	

<div class="page" >
	<NavHeader title="交易"></NavHeader>
	<NavFooter></NavFooter>
	<div class="content">
		<ul class="nav-tab" @click="navTab">
			<li>买入</li>
			<li >卖出</li>
			<li>撤单</li>
			<li class="active">持有</li>
		</ul>
		<div class="tab-content">
			<div class="seller-panel">
				<table>
					<tr>
						<th>卖家</th>
						<th>仓库</th>
						<th>离岸价</th>
						<th>到岸价</th>
						<th>数量</th>
					</tr>
					<tr>
						<td>100001</td>
						<td>杭州仓</td>
						<td class="lianjia">46.70</td>
						<td class="daoanjia">54.77</td>
						<td>669</td>
					</tr>
					<tr>
						<td>100001</td>
						<td>杭州仓</td>
						<td class="lianjia">46.70</td>
						<td class="daoanjia">54.77</td>
						<td>669</td>
					</tr>
				</table>
			</div>
			<div class="stock-panel  mt10">
				<div class="five-grade-panel">
					<table class="five-grade">
						<tbody>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">卖5</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">卖4</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.54,9)">
							<td class="tl">卖3</td>
							<td class="tc red">198.54</td>
							<td class="tr blue">9</td>
						</tr>
						<tr onclick="priceset(197.24,679)">
							<td class="tl">卖2</td>
							<td class="tc red">197.24</td>
							<td class="tr blue">679</td>
						</tr>
						<tr onclick="priceset(173.62,1407)">
							<td class="tl">卖1</td>
							<td class="tc red">173.62</td>
							<td class="tr blue">1407</td>
						</tr>
						<tr>
							<td colspan="3" class="caption tc fb"></td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买5</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买4</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买3</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买2</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(173.62,1407)">
							<td class="tl">买1</td>
							<td class="tc red">173.62</td>
							<td class="tr blue">1407</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="input-panel">
					<div class="input-text">
						<input type="text" placeholder="" value="AA0018">
					</div>
					<div class="input-text">
						<input type="text" placeholder="" value="三黄土鸡 0.7kg/只A2德鑫盛">
					</div>
					<div class="input-num">
						<span class="pric-">—</span>
						<input type="text" class="pricvle" value="198.24" placeholder="请输入买入价格">
						<span class="pricall">+</span>
					</div>
					<div class="f25">最大可买数量：312</div>
					<div class="input-num mt20">
						<span class="mun-">—</span>
						<input type="text" class="munvle" value="20" placeholder="请输入买入数量">
						<span class="munall">+</span>
					</div>
					<div class="shortcut-select">
						<ul>
							<li>100%</li>
							<li>75%</li>
							<li class="active">50%</li>
							<li>25%</li>
							<li>10%</li>
						</ul>
					</div>
				</div>
				<div class="clear"></div>
				<div class="large-btn mt10">
					<button type="button">立即买入</button>
				</div>
			</div>

			<div class="mt10 history-bought">
				<h5><span>浏览记录</span></h5>
				<div class="goods-wrapper">
					<ul>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
					</ul>
				</div>

			</div>
		</div>
		<div class="tab-content ">
			<div class="seller-panel">
				<table>
					<tr>
						<th>卖家</th>
						<th>仓库</th>
						<th>离岸价</th>
						<th>到岸价</th>
						<th>数量</th>
					</tr>
					<tr>
						<td>100001</td>
						<td>杭州仓</td>
						<td class="lianjia">46.70</td>
						<td class="daoanjia">54.77</td>
						<td>669</td>
					</tr>
				</table>
			</div>
			<div class="stock-panel mt10">
				<div class="five-grade-panel">
					<table class="five-grade">
						<tbody>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">卖5</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">卖4</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.54,9)">
							<td class="tl">卖3</td>
							<td class="tc red">198.54</td>
							<td class="tr blue">9</td>
						</tr>
						<tr onclick="priceset(197.24,679)">
							<td class="tl">卖2</td>
							<td class="tc red">197.24</td>
							<td class="tr blue">679</td>
						</tr>
						<tr onclick="priceset(173.62,1407)">
							<td class="tl">卖1</td>
							<td class="tc red">173.62</td>
							<td class="tr blue">1407</td>
						</tr>
						<tr>
							<td colspan="3" class="caption tc fb"></td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买5</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买4</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买3</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(198.24,669)">
							<td class="tl">买2</td>
							<td class="tc red">198.24</td>
							<td class="tr blue">669</td>
						</tr>
						<tr onclick="priceset(173.62,1407)">
							<td class="tl">买1</td>
							<td class="tc red">173.62</td>
							<td class="tr blue">1407</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="input-panel">
					<div class="input-text">
						<input type="text" placeholder="" value="AA0018">
					</div>
					<div class="input-text">
						<input type="text" placeholder="" value="三黄土鸡 0.7kg/只A2德鑫盛">
					</div>
					<div class="input-num">
						<span class="pric-">—</span>
						<input type="text" class="pricvle" value="198.24" placeholder="请输入买入价格">
						<span class="pricall">+</span>
					</div>
					<div class="f25">最大可买数量：312</div>
					<div class="input-num mt20">
						<span class="mun-">—</span>
						<input type="text" class="munvle" value="20" placeholder="请输入买入数量">
						<span class="munall">+</span>
					</div>
					<div class="shortcut-select">
						<ul>
							<li>100%</li>
							<li>75%</li>
							<li class="active">50%</li>
							<li>25%</li>
							<li>10%</li>
						</ul>
					</div>
				</div>
				<div class="clear"></div>
				<div class="large-btn mt10">
					<button type="button">立即卖出</button>
				</div>
			</div>

			<div class="mt10 history-bought">
				<h5><span>浏览记录</span></h5>
				<div class="goods-wrapper">
					<ul>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
						<li>
							<img src="../assets/pic.jpg" alt="">
							<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="tab-content ">
			<div class="scroll-table" >
				<!--表格标题-->
				<div class="scroll-table-title">
					<!-- 左上角（固定，不参与滚动） -->
					<div class="scroll-table-title-left">
						<table>
							<tr>
								<td>商品代码</td>
							</tr>
						</table>
					</div>
					<!-- 上滚动栏（表格标题） -->
					<div class="scroll-table-title-right">
						<table>
							<tr>
								<td>商品名称</td>
								<td>委托时间</td>
								<td>买/卖</td>
								<td>订/转</td>
								<td>委托价格</td>
								<td>委托数量</td>
								<td>成交数量</td>
								<td>委托编号</td>
								<td>状态</td>
							</tr>
						</table>
					</div>
				</div>
				<!-- 表格内容 -->
				<div class="scroll-table-content">
					<!--<div class="mui-hidden hold-tips hold-sell-tips">您还没有持仓哦。</div>-->
					<!-- 左边固定部分 -->
					<div class="scroll-table-content-left">
						<table class="">
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>
							<tr>
								<td>
									424534
								</td>
							</tr>

						</table>
					</div>
					<!-- 右边滚动部分 -->
					<div class="scroll-table-content-right" style="width:225px;">
						<table class="">
							<tr>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>123123</td>
								<td>123123</td>
								<td>23123</td>
								<td>211</td>
								<td>123213</td>
								<td>3123</td>
								<td>1232323</td>
								<td>232324</td>
							</tr>
							<tr>
								<td>2222</td>
								<td>233</td>
								<td>4333</td>
								<td>5444</td>
								<td>2333</td>
								<td>5444</td>
								<td>43334</td>
								<td>6554</td>
								<td>34444</td>
							</tr>
							<tr>
								<td>2322323</td>
								<td>23232</td>
								<td>2</td>
								<td>2</td>
								<td>{i tem.entrustPrice}}</td>
								<td>{it em.entrustAmount}}</td>
								<td>{i tem.tradedAmount}}</td>
								<td>{i tem.entrustNo}}</td>
								<td>{it em.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr >
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>

							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
							<td>{item.name}}</td>
							<td>{item.time}}</td>
							<td>{item.buyOrSell}}</td>
							<td>{item.ts}}</td>
							<td>{item.entrustPrice}}</td>
							<td>{item.entrustAmount}}</td>
							<td>{item.tradedAmount}}</td>
							<td>{item.entrustNo}}</td>
							<td>{item.entrustStatus}}</td>
						</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>
							<tr>
								<td>{item.name}}</td>
								<td>{item.time}}</td>
								<td>{item.buyOrSell}}</td>
								<td>{item.ts}}</td>
								<td>{item.entrustPrice}}</td>
								<td>{item.entrustAmount}}</td>
								<td>{item.tradedAmount}}</td>
								<td>{item.entrustNo}}</td>
								<td>{item.entrustStatus}}</td>
							</tr>

						</table>
					</div>
				</div>
			</div>
			<!--<div class="cancelOrder-btn-wrapper">
                <button disabled class="cancelOrder-btn" @click="toCancelCurrDayTradedOrder">撤单</button>
            </div>-->
		</div>


		<div class="tab-content show " >
			<div class="scroll-table order-table">
				<!--表格标题-->
				<!--表格标题-->
				<div class="scroll-table-title">
					<!-- 左上角（固定，不参与滚动） -->
					<div class="scroll-table-title-left">
						<table><tr><td>商品代码</td></tr></table>
					</div>
					<!-- 上滚动栏（表格标题） -->
					<div class="scroll-table-title-right">
						<table>
							<tr><td>买卖</td><td>商品名称</td><td>持有量</td><td>可用量</td><td>持有总成本</td></tr>
						</table>
					</div>
				</div>
				<!-- 表格内容 -->
				<div class="scroll-table-content">
					<!--<div class="mui-hidden hold-tips hold-sell-tips">您还没有持仓哦。</div>-->
					<!-- 左边固定部分 -->
					<div class="scroll-table-content-left">
						<table class="">
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>
									424534
								</td>
							</tr>

						</table>
					</div>
					<!-- 右边滚动部分 -->
					<div class="scroll-table-content-right" style="width:225px;">
						<table class="">
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>323232</td>
								<td>212</td>
								<td>545454.76</td>

							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>

								<td>323232</td>
								<td>23323</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>4523</td>
								<td>2344</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>53343</td>
								<td>788</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>卖出</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>7575</td>
								<td>5656</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>98978</td>
								<td>565</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>卖出</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>4555</td>
								<td>5656</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>2112</td>
								<td>7667</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>7878</td>
								<td>5656</td>
								<td>545454.76</td>
							</tr>

							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>7888</td>
								<td>6767</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>卖出</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>676767</td>
								<td>3223</td>
								<td>545454.76</td>
							</tr><tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
							<td>买入</td>
							<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
							<td>876868</td>
							<td>4545</td>
							<td>545454.76</td>
						</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>34343</td>
								<td>56464</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>卖出</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>32323</td>
								<td>6767</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>买入</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>54545</td>
								<td>7878</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>卖出</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>5646</td>
								<td>1212</td>
								<td>545454.76</td>
							</tr>
							<tr  data-no="{item.entrustNo}}" class="entrustNo-{item.entrustNo}}">
								<td>卖出</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>32323</td>
								<td>43434</td>
								<td>545454.76</td>
							</tr>

						</table>
					</div>
				</div>
			</div>
			<!--<div class="cancelOrder-btn-wrapper">
                <button disabled class="cancelOrder-btn" @click="toCancelCurrDayTradedOrder">撤单</button>
            </div>-->
		</div>
	</div>

</div>

</template>
<script>
	import NavFooter from '../components/NavFooter.vue';
	import NavHeader from '../components/NavHeader.vue';
	export default {
		components : {
			NavFooter,
			NavHeader,
		}
	}
</script>
<style lang="scss">
	.stock-panel {
  margin-bottom: .1rem;
  overflow: hidden;
  padding: .2rem .15rem 0;
  height: 6.5rem;
  background: #fff;
}

.stock-panel .five-grade-panel {
  float: right;
  background-color: #fff;
  width: 2.48rem;
  height: 5.14rem;
  border: 1px solid #e5e5e5;
  padding: .05rem .15rem 0 .2rem;
}

.stock-panel .input-panel {
  width: 4.6rem;
  float: left;
  background-color: #fff;
  height: 5.14rem;
}

.five-grade {
  width: 100%;
  font-size: .18rem;
}

.five-grade .caption {
  height: 1px;
  font-size: 0;
  line-height: 0;
  border-bottom: 1px solid #e5e5e5;
}

.five-grade td {
  height: .49rem;
  width: 30.3%;
}

.five-grade th {
  font-weight: 300;
  height: .54rem;
  border-bottom: 1px solid #b4bbd6;
}

.input-panel .input-text {
  height: .75rem;
  border: 1px solid #e5e5e5;
  margin-bottom: .20rem;
}

.input-panel .input-text span {
  font-size: .25rem;
  float: left;
}

.input-panel .input-text input {
  font-size: .2rem;
  float: left;
  width: 100%;
  height: .70rem;
  padding: .1rem .35rem;
  border: none;
}

.input-panel .input-num {
  height: .75rem;
  border: 1px solid #e5e5e5;
  margin-bottom: .20rem;
}

.input-panel .input-num span:first-child {
  font-size: .25rem;
  float: left;
  background-color: #262992;
  display: block;
  line-height: .73rem;
  text-align: center;
  width: .8rem;
  color: #fff;
}

.input-panel .input-num span:last-of-type {
  font-size: .35rem;
  float: right;
  background-color: #262992;
  display: block;
  line-height: .73rem;
  text-align: center;
  width: .8rem;
  color: #fff;
}

.input-panel .input-num span~input {
  box-sizing: border-box;
  width: 2.9rem;
}

.input-panel .input-num input {
  font-size: .2rem;
  float: left;
  width: 100%;
  height: .70rem;
  padding: .1rem .35rem;
  border: none;
}

.shortcut-select {
  margin-top: .23rem;
  border: 1px solid #ddd;
  height: .76rem;
  font-size: .28rem;
}

.shortcut-select ul li {
  display: table-cell;
  width: 1%;
  text-align: center;
  border-right: 1px solid #ddd;
  line-height: .74rem;
  color: #18469e;
}

.shortcut-select ul li:last-child {
  border-right: none;
}

.shortcut-select ul li.active {
  background-color: #18469e;
  color: #fff;
}

.large-btn {
  border-bottom: none;
  height: 1.3rem;
  padding-top: .1rem;
}

.large-btn button {
  width: 100%;
  float: left;
  height: .8rem;
  border-radius: .06rem;
  font-size: .28rem;
  color: #fff;
  background: -webkit-linear-gradient(#324fff, #1d2088);
  background: url("../assets/kjjj_btn_bg.png") no-repeat;
  background-size: 100%;
  border: none;
  box-shadow: 0 1px 4px 0 #5887ff;
}

.seller-panel {
  background-color: #fff;
  padding: .2rem;
}

.seller-panel table {
  width: 100%;
  text-align: center;
}

.seller-panel th {
  border-bottom: 1px solid #b4bbd6;
  border-width: 1px 0;
  height: .55rem;
  font-size: .2rem;
  font-weight: 300;
}

.seller-panel td {
  height: .6rem;
  font-size: .22rem;
  font-weight: 700;
}

.history-bought {
  background-color: #fff;
  padding-left: .2rem;
  margin-bottom: .1rem;
  width: 7.5rem;
  overflow: hidden;
}

.history-bought .goods-wrapper {
  overflow: hidden;
}

.history-bought h5 {
  height: .6rem;
  padding: .17rem 0;
  margin: 0;
}

.history-bought h5 span {
  display: block;
  border-left: .04rem solid #21ac37;
  padding-left: .2rem;
  font-size: .25rem;
  font-weight: 300;
  line-height: 1;
}

.history-bought ul {
  white-space: nowrap;
  display: inline-block;
}

.history-bought ul li {
  width: 2.6rem;
  margin-right: .2rem;
  overflow: hidden;
  display: inline-block;
}

.history-bought ul li img {
  width: 2.6rem;
  display: block;
}

.history-bought ul li p {
  margin: 0;
  padding: 0;
  font-size: .25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 2;
}

.nav-tab {
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  height: .7rem;
  display: table;
  width: 100%;
  position: relative;
  z-index: 2;
}

.nav-tab li {
  box-sizing: border-box;
  height: .7rem;
  vertical-align: middle;
  display: table-cell;
  color: #2e2f33;
  font-size: .25rem;
  text-align: center;
  width: 25%;
  position: relative;
}

.nav-tab li.active {
  color: #22ac38;
}

.nav-tab li.active::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  content: '';
  height: 2px;
  background: #22ac38;
  display: inline-block;
}

.tab-content {
  top: 0.7rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  visibility: hidden;
}

.tab-content.show {
  z-index: 1;
  visibility: visible;
}


/*
 * 滚动表格默认样式
 */
.scroll-table{
	position: absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	font-size:0.25rem;
	background:#fff;
}
.scroll-table-title{
    height:0.6rem;
}
.scroll-table-title td{
    height:0.6rem;
}
.scroll-table-title-left{
	width:100px;
	display:inline-block;
	height:0.6rem;
	position: relative;
}
.scroll-table-title-right{
	position: absolute;
	top:0;
	right:0;
	overflow: hidden;
	z-index:1;
}
.scroll-table-content{
	position: absolute;
	overflow: hidden;
	top:0.6rem;
	left:0;
	right:0;
	bottom:0;
	overflow-y: auto;
	overflow-x:hidden;
	font-size:13px;
	color:#555;
}
.scroll-table-content td{
	height:1rem;
	
}
.scroll-table-content-left {
	float:left;
	z-index:1;
	position: relative;
}
.scroll-table-content-right{
	float:left;
	width:150px;
	z-index:0;
	position: relative;
	overflow-x:hidden;
}
.scroll-table table{
	border-collapse: collapse;
}
.scroll-table table td,table th{
	text-align: center;
	padding:5px;
	vertical-align: middle;			
}
.scroll-table table td{
	
	white-space: initial;
	word-break:break-all;
	
}
.scroll-table tr{
	white-space: nowrap;
	border-bottom:1px solid #eee;
}
			


</style>

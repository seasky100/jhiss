
// let columns = [
//     { prop: 'date', label: '日期', align: 'left' },
//     { prop: 'name', label: '配送信息', align: 'left', 
//         children: [
//         { prop: 'name', label: '姓名', align: 'left'},
//         { prop: '', label: '地址', align: 'left',
//             children: [
//             { prop: 'province', label: '省份', align: 'left' },
//             { prop: 'city', label: '市区', align: 'left' },
//             { prop: 'address', label: '地址', align: 'left' },
//             { prop: 'zip', label: '邮编', align: 'left' },
//             ]
//         },
//         ]
//     },
// ]
let data1 = [
    {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }, {
        date: '2016-05-07',
        name: '王小虎11',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
    }
]

// 本人的婚姻情况
let columns1 = [
    { index: 0, prop: '', label: '婚姻情况', align: 'left',
        children: [
            {index: 0, prop: '', label: '婚姻变化情况', align: 'left' }
        ]
    },
    { index: 1, prop: 'marrageState2', prop2:'marrageState', label: '婚姻现状', align: 'left',
        type:'checkbox', 
        status: 'fixedState',
        option: [
            {name: '未婚', value:'0'},
            {name: '已婚', value:'1'},
            {name: '离异', value:'2'},
            {name: '丧偶', value:'4'},
        ],
        children: [
            { index: 0, prop: 'value2', label: '有无变化', align: 'left',
                type:'checkbox', 
                option: [
                    {name: '无变化', value:'1'}
                ],
                children: [
                    { index: 0, prop: '', width: '40px', label: '有变化', align: 'left' },
                    { index: 1, prop: 'marrageState', label: '婚姻情况', align: 'left',
                        type:'checkbox', 
                        option: [
                            {name: '结婚', value:'1'},
                            {name: '离异', value:'2'},
                            {name: '再婚', value:'3'},
                            {name: '丧偶', value:'4'},
                        ],
                    },
                    { index: 2, prop: '', width: '30px', label: '变化时间', align: 'left',
                        children: [
                            { index: 0, prop: 'changeTime', type: 'date', label: '文本', align: 'left' }
                        ]
                    },
                    { index: 3, prop: '', label: '变化原因', align: 'left',
                        children: [
                            { index: 0, prop: 'changeDesc', type: 'text', label: '文本', align: 'left' },
                            // { index: 0, prop: 'value5', label: '', align: 'left' }
                        ]
                    },
                ]
            },
        ]
    },
]
// 本人持有普通护照的情况
let columns2 = [
    { prop: 'certificatesNumber', label: '护照号', align: 'left' },
    { prop: 'issueDate', label: '签发日期', type: 'date', align: 'left' },
    { prop: 'validity', label: '有效期截至', type: 'date', align: 'left' },
    { prop: 'orgName', label: '保管机构', align: 'left' },
    { prop: 'remark', label: '备注', align: 'left' },
]
// 本人因私出国的情况
let columns3 = [
    { prop: 'startTime', label: '出发时间', type: 'date', align: 'left' },
    { prop: 'endTime', label: '归国时间', type: 'date', align: 'left' },
    { prop: 'exitCountry', label: '所到国家', align: 'left' },
    { prop: 'cause', label: '事由', align: 'left' },
    { prop: 'approvalAgency', label: '审批机构', align: 'left' },
    { prop: 'certificateNumber', label: '所用护照号', align: 'left' },
]
// 本人持有往来港澳通行证、因私持有大陆居民往来台湾通行证的情况
let columns4 = [
    { prop: 'certificateType', label: '证件名称', align: 'left' },
    { prop: 'certificateNumber', label: '证件号码', align: 'left' },
    { prop: 'startTime', label: '开始有效期', type: 'date', align: 'left' },
    { prop: 'endTime', label: '有效期截至', type: 'date', align: 'left' },
    { prop: 'exitProvince', label: '保管机构', align: 'left' },
    { prop: 'comment', label: '备注', align: 'left' },
]
// 本人因私往来港澳、台湾的情况
let columns5 = [
    { prop: 'startTime', label: '开始日期', type: 'date', align: 'left' },
    { prop: 'endTime', label: '结束日期', type: 'date', align: 'left' },
    { prop: 'exitProvince', label: '所到地区', align: 'left' },
    { prop: 'cause', label: '事由', align: 'left' },
    { prop: 'exitCountry', label: '审批机构', align: 'left' },
    { prop: 'certificateNumber', label: '所用证件号码', align: 'left' },
]
// 子女与外国人、无国籍人通婚的情况
let columns6 = [
    { prop: 'childName', label: '子女姓名', align: 'left' },
    { prop: '', label: '子女的配偶基本情况', align: 'left', 
        children: [
            { prop: 'name', label: '姓名', align: 'left'},
            { prop: 'country', label: '国家', align: 'left' },
            { prop: 'workCompany', width: '250px', label: '工作（学习）单位', align: 'left' },
            { prop: 'post', label: '职务', align: 'left' },
            { prop: 'changeTime', width: '130px', label: '登记时间', type: 'date', align: 'left' },
        ]
    },
]
// 子女与港澳以及台湾居民通婚的情况
let columns7 = [
    { prop: 'childName', label: '子女姓名', align: 'left' },
    { prop: '', label: '子女的配偶基本情况', align: 'left', 
        children: [
            { prop: 'name', label: '姓名', align: 'left'},
            { prop: 'country', label: '地区', align: 'left' },
            { prop: 'workCompany', width: '250px', label: '工作（学习）单位', align: 'left' },
            { prop: 'post', label: '职务', align: 'left' },
            { prop: 'changeTime', width: '130px', label: '登记时间', type: 'date', align: 'left' },
        ]
    },
]
// 配偶、子女移居国（境）外的情况
let columns8 = [
    { prop: 'name', label: '姓名', align: 'left' },
    { prop: 'country', label: '移居国家（地区）', align: 'left' },
    { prop: 'city', label: '现居住城市', align: 'left' },
    { prop: 'documentNumber', label: '移居证件号码', align: 'left' },
    { prop: 'emigrateState', label: '移居类别', width: '140px', align: 'left', 
        formatter: 'formatter_lb',
        type:'checkbox', 
        option: [
            {name: '外国国籍', value:'1'},
            {name: '永久居留资格', value:'2'},
            {name: '长期居留许可', value:'3'},
        ] 
    },
    { prop: 'strartTime', label: '移居时间', type: 'date', align: 'left' },
    { prop: 'comment', label: '备注', align: 'left' },
]
// 配偶、子女虽未移居国（境）外，但连续在国（境）外工作、生活一年以上的情况
let columns9 = [
    { prop: 'name', label: '姓名', align: 'left' },
    { prop: 'country', label: '所在国家（地区）', align: 'left' },
    { prop: 'city', label: '工作、生活城市', align: 'left' },
    { prop: 'strartTime', label: '开始时间', type: 'date', align: 'left' },
    { prop: 'endTime', label: '结束时间', type: 'date', align: 'left' },
    { prop: 'comment', label: '备注', align: 'left' },
]
// 配偶、子女及其配偶被司法机关追究刑事责任的情况
let columns11 = [
    { prop: 'name', label: '姓名', align: 'left' },
    { prop: 'happenTime', label: '被追究时间', type: 'date', align: 'left' },
    { prop: 'cause', label: '被追究原因', align: 'left' },
    { prop: 'stage', label: '处理阶段', align: 'left',
        formatter: 'ProcessingStage',
        type:'checkbox', 
        option: [
            {name: '立案侦查', value:'1'},
            {name: '审查起诉', value:'2'},
            {name: '刑事审判', value:'3'},
            {name: '刑罚执行', value:'4'},
            {name: '执行完毕', value:'5'},
            {name: '其他', value:'6'},
        ] 
    },
    { prop: 'result', label: '处理结果', align: 'left' },
]

// 本人的工资及各类奖金、津贴、补贴等 （万元/全年）
let columns21 = [
    { prop: 'name', label: '工资（含津贴、补贴）', align: 'left' },
    { prop: 'date', label: '奖金', align: 'left' },
    { prop: 'address', label: '其他', align: 'left' },
    { prop: 'zip', label: '合计', align: 'left' },
]

// 本人从事讲学、写作、咨询、审稿、书画等劳务所得  （万元/全年）
let columns22 = [
    { prop: 'giveLectures', label: '讲学', align: 'left' },
    { prop: 'writing', label: '写作', align: 'left' },
    { prop: 'consultation', label: '咨询', align: 'left' },
    { prop: 'peerReview', label: '审稿', align: 'left' },
    { prop: 'paintingCalligraphy', label: '书画', align: 'left' },
    { prop: 'other', label: '其他', align: 'left' },
    { prop: 'total', label: '合计', align: 'left' },
]

// 本人、配偶、共同生活的子女为所有权人或者共有人的房产情况
let columns23 = [
    { prop: 'name', label: '产权人姓名', align: 'left' },
    { prop: 'houseSource', label: '房产来源', align: 'left',
        width: '120px',
        formatter: 'propertySource',
        type:'checkboxArr', 
        // type: 'checkbox',
        option: [
            // {name: '购买', value:'1'},
            // {name: '继承', value:'2'},
            // {name: '接受赠与', value:'3'},
            // {name: '分割', value:'4'},
            // {name: '合并', value:'5'},
            // {name: '变更', value:'6'},
            // {name: '交换', value:'7'},
            // {name: '析产', value:'8'},
            // {name: '其他来源', value:'4'},
            {name: '购买', value:'1'},
            {name: '继承', value:'2'},
            {name: '接受赠与', value:'3'},
            {name: '其他来源', value:'9'},
        ],
        option2: [
            {name: '出售', value:'10'},
            {name: '赠与他人', value:'11'},
            {name: '其他去向', value:'12'},
        ],
    },
    { prop: 'address', label: '具体地址', align: 'left' },
    { prop: 'area', label: '建筑面积（㎡）', align: 'left' },
    { prop: 'houseType', label: '房产性质', align: 'left',
        width: '120px',
        formatter: 'propertyNature',
        type:'checkbox', 
        option: [
            // {name: '住宅', value:'1'},
            // {name: '商住房', value:'2'},
            // {name: '厂房', value:'3'},
            // {name: '仓库', value:'4'},
            // {name: '自建房', value:'5'},
            // {name: '其他', value:'6'},
            {name: '商品房', value:'2'},
            {name: '福利房', value:'7'},
            {name: '经济适用房', value:'1'},
            {name: '限价房', value:'8'},
            {name: '自建房', value:'5'},
            {name: '车库、车位', value:'3'},
            {name: '储藏间', value:'4'},
            {name: '其他', value:'6'},
        ] 
    },
    { prop: 'tradeTime', label: '交易时间（年月）', type: 'date', align: 'left' },
    { prop: 'total', label: '交易价格（万元）', align: 'left' },
]

let appendTab4 = [
    { columnIndex: 0, rowSpan: 3, summaryfunc:'summaryfunc1', labelName: '填报前一交易日所有股票的总市值', total: 200333 },
    { columnIndex: 0, rowSpan: 3, summaryfunc:'summaryfunc2', labelName: '账户总资产', total: 200333 },
    { columnIndex: 1, rowSpan: 3, summaryfunc:'summaryfunc3', labelName: '备注',total: 200333 },
]

// 本人、配偶、共同生活的子女投资或者以其他方式持有股票的情况
let columns24 = [
    { prop: 'holderName', label: '持有人姓名', align: 'left' },
    { prop: 'productName', label: '股票名称或代码', align: 'left' },
    { prop: 'share', label: '持股数量', align: 'left' },
    { prop: 'total', label: '填报前 - 交易日市值（万元）', align: 'left' },
]

// 本人、配偶、共同生活的子女投资或者以其他方式持有基金的情况
let columns25 = [
    { prop: 'holderName', label: '持有人姓名', align: 'left' },
    { prop: 'productName', label: '基金名称或代码', align: 'left' },
    { prop: 'share', label: '基金份额', align: 'left' },
    { prop: 'total', label: '填报前 - 交易日净值（万元）', align: 'left' },
]

// 本人、配偶、共同生活的子女投资或者以其他方式持有投资型保险的情况
let columns26 = [
    { prop: 'holderName', label: '投保人姓名', align: 'left' },
    { prop: 'productName', label: '保险产品全称', align: 'left' },
    { prop: 'share', label: '保单号', align: 'left' },
    { prop: 'name', label: '保险公司名称', align: 'left' },
    { prop: 'total', label: '累积缴纳保费、投资金（万元）', align: 'left' },
]

// 配偶、子女及其配偶经商办企业的情况
let columns27 = [
    { index: 0, prop: '', label: '姓名', align: 'left',
        children: [
            { index: 0, prop: '', label: '企业或其他市场主体名称', align: 'left',
                children: [
                    { index: 0, prop: '', label: '经营范围', align: 'left' },
                ]
            },
        ]
    },
    { index: 1, prop: 'name', type: 'text', label: '文本', align: 'left',
        children: [
            { index: 0, prop: 'companyName', type: 'text', label: '文本', align: 'left',
                children: [
                    { index: 0, prop: 'businessScope', type: 'text', label: '文本', align: 'left' },
                ]
            },
        ]
    },
    { index: 2, prop: '', label: '同统一社会信用代码/注册号', align: 'left',
        children: [
            { index: 0, prop: '', label: '成立日期', align: 'left',
                children: [
                    { index: 0, prop: '', label: '注册地', align: 'left',
                        children: [
                            { index: 0, prop: '', label: '经营地', align: 'left' },
                        ]
                    },
                ]
            },
        ]
    },
    { index: 3, prop: 'creditCode', type: 'text', label: '文本', align: 'left',
        children: [
            { index: 0, prop: 'buildTime', type: 'date', label: '文本', align: 'left',
                children: [
                    { index: 0, prop: 'registered', type: 'text', label: '文本', align: 'left',
                        children: [
                            { index: 0, prop: 'businessPlace', type: 'text', label: '文本', align: 'left' },
                        ]
                    },
                ]
            },
        ]
    },
]

let headerAppend27 = [
    { index: 0, prop: '', label: '企业或其他市场主体类型', align: 'left',
        children:[
            { index: 0, prop: '', label: '注册资本（金）或咨询数额（出资额）（万元）', align: 'left',
                children:[
                    { index: 0, prop: '', label: '个人认缴出资额或个人出资额（万元）', align: 'left' },
                ]
            },
        ]
    },
    { index: 1, prop: 'companyType', label: '类型', align: 'left',
        type:'checkbox', 
        option: [
            {name: '股份有限公司', value:'1'},
            {name: '有限责任公司', value:'2'},
            {name: '个体工商户', value:'3'},
            {name: '个人独资企业', value:'4'},
            {name: '合伙企业', value:'5'},
            {name: '在国（境）外注册公司或投资入股', value:'6'},
            {name: '其他', value:'7'},
        ],
        children: [
            { index: 0, prop: 'registeredCapital', type: 'text', label: '文本', align: 'left',
                children: [
                    { index: 0, prop: 'personalContribution', type: 'text', label: '文本', align: 'left' },
                    { index: 1, prop: '', label: '个人认缴出资比例或个人出资比例（%）', align: 'left' },
                    { index: 2, prop: 'personalRatio', type: 'text', label: '文本', align: 'left' },
                ]
            },
        ]
    },
]

// 本人、配偶、共同生活的子女在国（境）外的存款情况
let columns28 = [
    { prop: 'name', label: '存款人姓名', align: 'left' },
    { prop: 'country', label: '存款的国家（地区）及城市', align: 'left' },
    { prop: 'bankAccount', label: '开户银行或金融机构全称', align: 'left' },
    { prop: 'currency', label: '币种', align: 'left' },
    { prop: 'amountPaid', label: '金额（万元）', align: 'left' },
    { prop: 'comment', label: '备注', align: 'left' },
]

// 本人、配偶、共同生活的子女在国（境）外的投资情况
let columns29 = [
    { prop: 'name', label: '投资人姓名', align: 'left' },
    { prop: 'country', label: '投资的国家（地区）及城市', align: 'left' },
    { prop: 'investmentSituation', label: '投资情况', align: 'left' },
    { prop: 'currency', label: '币种', align: 'left' },
    { prop: 'amountPaid', label: '投资金额（万元）', align: 'left' },
    { prop: 'comment', label: '备注', align: 'left' },
]

// 本人、配偶、共同生活的子女参与民间借贷的情况
let columns210 = [
    { prop: 'borrower', label: '借款对象', align: 'left' },
    { prop: 'workCompany', label: '借款对象工作单位', align: 'left' },
    { prop: 'isBorrow', label: '借入/借出', align: 'left' },
    { prop: 'borrowReason', label: '借款事由', align: 'left' },
    { prop: 'amount', label: '金额（万元）', align: 'left' },
    { prop: 'interest', label: '约定利息', align: 'left' },
    { prop: 'term', label: '期限', align: 'left' },
    { prop: 'comment', label: '备注', align: 'left' },
]

let tableData = [
    { columns: columns1, data: [], headerTab: 2, headerParam:{edit:false} }, // 111
    { columns: columns2, data: [data1[0]] },
    { columns: columns3, data: [] },
    { columns: columns4, data: [] },
    { columns: columns5, data: [] },
    { columns: columns6, data: [] },
    { columns: columns7, data: [] },
    { columns: columns8, data: [] },
    { columns: columns9, data: [] },
    { columns: columns9, data: [], headerTab: 3,headerParam:{edit:false} }, // 111
    { columns: columns11, data: [] },
]

let tableData2 = [
    { columns: columns21, data: [data1[0]] }, 
    { columns: columns22, data: [data1[0]] },    
    { columns: columns23, data: [] }, // 第二列行合并
    { columns: columns24, data: [], appendTab: [...appendTab4] },
    { columns: columns25, data: [] },
    { columns: columns26, data: [] },
    { columns: columns27, data: [], headerTab: 4, headerAppend: headerAppend27, headerParam:{edit:false} }, // 111
    { columns: columns28, data: [] },
    { columns: columns29, data: [] },
    { columns: columns210, data: [] }, 
]
let data = {
    tableData1: tableData,
    tableData2: tableData2
}
export default data;

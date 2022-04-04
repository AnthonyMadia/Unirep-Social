import { Signer, ContractFactory, Overrides, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { UnirepSocial, UnirepSocialInterface } from "../UnirepSocial";
declare type UnirepSocialConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class UnirepSocial__factory extends ContractFactory {
    constructor(...args: UnirepSocialConstructorParams);
    deploy(_unirepContract: string, _postReputation: BigNumberish, _commentReputation: BigNumberish, _airdroppedReputation: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<UnirepSocial>;
    getDeployTransaction(_unirepContract: string, _postReputation: BigNumberish, _commentReputation: BigNumberish, _airdroppedReputation: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): UnirepSocial;
    connect(signer: Signer): UnirepSocial__factory;
    static readonly contractName: "UnirepSocial";
    readonly contractName: "UnirepSocial";
    static readonly bytecode = "0x6101006040523480156200001257600080fd5b5060405162001fbf38038062001fbf8339810160408190526200003591620001b2565b600080546001600160a01b038087166001600160a01b031992831617808455600180549093163317909255604080516315b7d18d60e21b8152905192909116926356df46349260048084019382900301818387803b1580156200009757600080fd5b505af1158015620000ac573d6000803e3d6000fd5b5050600054604051630a5500c360e41b81526001600160a01b03909116925063a5500c309150620000e29084906004016200022a565b600060405180830381600087803b158015620000fd57600080fd5b505af115801562000112573d6000803e3d6000fd5b505060005460405163131a91ad60e01b81526001600160a01b03909116925063131a91ad91506200014890309060040162000216565b60206040518083038186803b1580156200016157600080fd5b505afa15801562000176573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200019c9190620001fd565b60805260a09290925260c05260e0525062000233565b60008060008060808587031215620001c8578384fd5b84516001600160a01b0381168114620001df578485fd5b60208601516040870151606090970151919890975090945092505050565b6000602082840312156200020f578081fd5b5051919050565b6001600160a01b0391909116815260200190565b90815260200190565b60805160a05160c05160e051611d216200029e600039600061049601526000818161026b0152610dc40152600081816104cf01526106980152600081816102b7015281816106db0152818161093001528181610b5801528181610d320152610e1d0152611d216000f3fe6080604052600436106100dd5760003560e01c80637efef9c81161007f578063bf8036ba11610059578063bf8036ba146101ff578063f2800cc914610214578063f73c8ebb14610227578063f85ec78f14610247576100dd565b80637efef9c8146101b757806392389453146101ca578063b876ed71146101df576100dd565b8063350f1ba6116100bb578063350f1ba61461014f578063417b16e314610164578063494e2171146101845780635e888136146101a4576100dd565b8063047f4abc146100e2578063297905bb146100f75780632caf5ef814610122575b600080fd5b6100f56100f036600461148d565b610269565b005b34801561010357600080fd5b5061010c610494565b6040516101199190611694565b60405180910390f35b34801561012e57600080fd5b5061014261013d366004611475565b6104b8565b6040516101199190611689565b34801561015b57600080fd5b5061010c6104cd565b34801561017057600080fd5b506100f561017f366004611475565b6104f1565b34801561019057600080fd5b506100f561019f36600461136e565b61062e565b6100f56101b23660046112ac565b610696565b6100f56101c536600461153c565b6108b6565b3480156101d657600080fd5b5061010c610d30565b3480156101eb57600080fd5b506100f56101fa3660046114f7565b610d54565b34801561020b57600080fd5b5061010c610dc2565b6100f561022236600461130d565b610de6565b34801561023357600080fd5b506100f56102423660046114f7565b611029565b34801561025357600080fd5b5061025c61105f565b604051610119919061169d565b7f00000000000000000000000000000000000000000000000000000000000000008160a00151146102b55760405162461bcd60e51b81526004016102ac90611a24565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000008160800151146102f85760405162461bcd60e51b81526004016102ac906117bb565b600054604080516310737dd760e31b815290516001600160a01b039092169163606736fb91839163839beeb891600480820192602092909190829003018186803b15801561034557600080fd5b505afa158015610359573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037d9190611294565b836040518363ffffffff1660e01b815260040161039a9190611ae8565b6000604051808303818588803b1580156103b357600080fd5b505af11580156103c7573d6000803e3d6000fd5b505050505080604001518360008054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b15801561041e57600080fd5b505afa158015610432573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104569190611294565b7f49b90d3022da381379a9322dd5c48fb3b2dabc811dd97afd94e8e0c3625093b985856040516104879291906116b1565b60405180910390a4505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60026020526000908152604090205460ff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b6001546001600160a01b0316331461051b5760405162461bcd60e51b81526004016102ac9061176d565b60005460405163417b16e360e01b81526001600160a01b039091169063417b16e39061054b908490600401611694565b600060405180830381600087803b15801561056557600080fd5b505af1158015610579573d6000803e3d6000fd5b505050508060008054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b1580156105ca57600080fd5b505afa1580156105de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106029190611294565b6040517fe43c2a2d0ba801f72bfb7df8c728919e1886a4d9a6a12d45eeee7417bae2f15590600090a350565b60005460405163494e217160e01b81526001600160a01b039091169063494e2171906106609085908590600401611b50565b600060405180830381600087803b15801561067a57600080fd5b505af115801561068e573d6000803e3d6000fd5b505050505050565b7f00000000000000000000000000000000000000000000000000000000000000008160a00151146106d95760405162461bcd60e51b81526004016102ac90611897565b7f000000000000000000000000000000000000000000000000000000000000000081608001511461071c5760405162461bcd60e51b81526004016102ac906117bb565b600054604080516310737dd760e31b815290516001600160a01b039092169163606736fb91839163839beeb891600480820192602092909190829003018186803b15801561076957600080fd5b505afa15801561077d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a19190611294565b836040518363ffffffff1660e01b81526004016107be9190611ae8565b6000604051808303818588803b1580156107d757600080fd5b505af11580156107eb573d6000803e3d6000fd5b5050505050806040015160008054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b15801561084157600080fd5b505afa158015610855573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108799190611294565b7f6da51c4a7f6055cf90f927a5dd196677509f6bff613f1087859c131e54d45ba884846040516108aa9291906116b1565b60405180910390a35050565b60006108c28587611c88565b9050600081116108e45760405162461bcd60e51b81526004016102ac9061171b565b6108ee8587611ca0565b1561090b5760405162461bcd60e51b81526004016102ac90611960565b808260a001511461092e5760405162461bcd60e51b81526004016102ac9061182c565b7f00000000000000000000000000000000000000000000000000000000000000008260800151146109715760405162461bcd60e51b81526004016102ac906117bb565b600054604080516310737dd760e31b815290516001600160a01b039092169163606736fb91839163839beeb891600480820192602092909190829003018186803b1580156109be57600080fd5b505afa1580156109d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f69190611294565b846040518363ffffffff1660e01b8152600401610a139190611ae8565b6000604051808303818588803b158015610a2c57600080fd5b505af1158015610a40573d6000803e3d6000fd5b50506000805460405163ad944e4760e01b81529194506001600160a01b0316925063ad944e479150610a76908690600401611ae8565b60206040518083038186803b158015610a8e57600080fd5b505afa158015610aa2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac69190611294565b6000805460405163099198f960e11b815292935090916001600160a01b039091169063132331f290610afc908590600401611694565b60206040518083038186803b158015610b1457600080fd5b505afa158015610b28573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b4c9190611294565b9050610b5661106e565b7f0000000000000000000000000000000000000000000000000000000000000000815260208082018a905260408083018a905260005481516310737dd760e31b815291516001600160a01b0390911692631e06fc0192849263839beeb892600480840193919291829003018186803b158015610bd157600080fd5b505afa158015610be5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c099190611294565b838a8a876040518663ffffffff1660e01b8152600401610c2c9493929190611aa0565b6000604051808303818588803b158015610c4557600080fd5b505af1158015610c59573d6000803e3d6000fd5b505050505086856040015160008054906101000a90046001600160a01b03166001600160a01b031663766718086040518163ffffffff1660e01b815260040160206040518083038186803b158015610cb057600080fd5b505afa158015610cc4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ce89190611294565b7f203d880d1533b25a9d06611aae6dec1a560907b90df8479cdab40e445188bce48c8c8b8b604051610d1d9493929190611c28565b60405180910390a4505050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60005460405163b876ed7160e01b81526001600160a01b039091169063b876ed7190610d8a908790879087908790600401611bfc565b600060405180830381600087803b158015610da457600080fd5b505af1158015610db8573d6000803e3d6000fd5b5050505050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60208082015160009081526002909152604090205460ff1615610e1b5760405162461bcd60e51b81526004016102ac90611910565b7f0000000000000000000000000000000000000000000000000000000000000000816060015114610e5e5760405162461bcd60e51b81526004016102ac906117bb565b8060800151600114610e825760405162461bcd60e51b81526004016102ac906119bd565b600054604080516310737dd760e31b815290516001600160a01b039092169163bff3df4191839163839beeb891600480820192602092909190829003018186803b158015610ecf57600080fd5b505afa158015610ee3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f079190611294565b836040518363ffffffff1660e01b8152600401610f249190611b02565b6000604051808303818588803b158015610f3d57600080fd5b505af1158015610f51573d6000803e3d6000fd5b505050602080840180516000908152600283526040808220805460ff19166001179055915190548251630ecce30160e31b815292519195506001600160a01b03169350637667180892600480840193919291829003018186803b158015610fb757600080fd5b505afa158015610fcb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fef9190611294565b7fcdc7a13869e4f8a627dbe2aaaf80ccb2acf27bea2ab437cd6de6d6789d1697bb8360405161101e9190611b02565b60405180910390a350565b60005460405163f73c8ebb60e01b81526001600160a01b039091169063f73c8ebb90610d8a908790879087908790600401611bfc565b6000546001600160a01b031681565b6040518060a0016040528060008152602001600081526020016000815260200160008152602001600081525090565b600082601f8301126110ad578081fd5b6101006110b981611c57565b80848684870111156110c9578485fd5b8493505b60088410156110ed578035835260019390930192602092830192016110cd565b5095945050505050565b600082601f830112611107578081fd5b8135602067ffffffffffffffff82111561112357611123611cd5565b808202611131828201611c57565b83815282810190868401838801850189101561114b578687fd5b8693505b8584101561116d57803583526001939093019291840191840161114f565b50979650505050505050565b600082601f830112611189578081fd5b813567ffffffffffffffff8111156111a3576111a3611cd5565b6111b6601f8201601f1916602001611c57565b8181528460208386010111156111ca578283fd5b816020850160208301379081016020019190915292915050565b600061022082840312156111f6578081fd5b611201610140611c57565b9050813567ffffffffffffffff81111561121a57600080fd5b611226848285016110f7565b8252506020820135602082015260408201356040820152606082013560608201526080820135608082015260a082013560a082015260c082013560c082015260e082013560e082015261010080830135818301525061012061128a8482850161109d565b9082015292915050565b6000602082840312156112a5578081fd5b5051919050565b600080604083850312156112be578081fd5b823567ffffffffffffffff808211156112d5578283fd5b6112e186838701611179565b935060208501359150808211156112f6578283fd5b50611303858286016111e4565b9150509250929050565b60006101a0828403121561131f578081fd5b61132960c0611c57565b82358152602083013560208201526040830135604082015260608301356060820152608083013560808201526113628460a0850161109d565b60a08201529392505050565b60008060408385031215611380578182fd5b823567ffffffffffffffff80821115611397578384fd5b908401906101e082870312156113ab578384fd5b6113b6610100611c57565b823581526020830135828111156113cb578586fd5b6113d7888286016110f7565b602083015250604083013560408201526060830135828111156113f8578586fd5b611404888286016110f7565b6060830152506080830135608082015260a083013582811115611425578586fd5b611431888286016110f7565b60a08301525060c083013560c082015261144e8760e0850161109d565b60e082015293506020850135915080821115611468578283fd5b50611303858286016110f7565b600060208284031215611486578081fd5b5035919050565b6000806000606084860312156114a1578081fd5b83359250602084013567ffffffffffffffff808211156114bf578283fd5b6114cb87838801611179565b935060408601359150808211156114e0578283fd5b506114ed868287016111e4565b9150509250925092565b60008060008061016080868803121561150e578283fd5b85359450602086013593506040860135925086818701111561152e578182fd5b509295919450926060019150565b600080600080600060a08688031215611553578283fd5b85359450602086013593506040860135925060608601359150608086013567ffffffffffffffff811115611585578182fd5b611591888289016111e4565b9150509295509295909350565b8060005b60088110156115c15781518452602093840193909101906001016115a2565b50505050565b6000815180845260208085019450808401835b838110156115f6578151875295820195908201906001016115da565b509495945050505050565b60006102208251818552611617828601826115c7565b9150506020830151602085015260408301516040850152606083015160608501526080830151608085015260a083015160a085015260c083015160c085015260e083015160e08501526101008084015181860152506101208084015161167f8287018261159e565b5090949350505050565b901515815260200190565b90815260200190565b6001600160a01b0391909116815260200190565b6000604082528351806040840152815b818110156116de57602081870181015160608684010152016116c1565b818111156116ef5782606083860101525b50601f01601f191682018281036060908101602085015261171290820185611601565b95945050505050565b60208082526032908201527f556e6972657020536f6369616c3a2073686f756c64207375626d6974206120706040820152716f73697469766520766f74652076616c756560701b606082015260800190565b6020808252602e908201527f556e6972657020536f6369616c3a207369676e2075702073686f756c6420746860408201526d3937bab3b41030b71030b236b4b760911b606082015260800190565b6020808252604b908201527f556e6972657020536f6369616c3a207375626d697420612070726f6f6620776960408201527f746820646966666572656e742061747465737465722049442066726f6d20556e60608201526a1a5c995c0814dbd8da585b60aa1b608082015260a00190565b60208082526045908201527f556e6972657020536f6369616c3a207375626d697420646966666572656e742060408201527f6e756c6c69666965727320616d6f756e742066726f6d2074686520766f74652060608201526476616c756560d81b608082015260a00190565b60208082526053908201527f556e6972657020536f6369616c3a207375626d697420646966666572656e742060408201527f6e756c6c69666965727320616d6f756e742066726f6d207468652072657175696060820152721c995908185b5bdd5b9d08199bdc881c1bdcdd606a1b608082015260a00190565b60208082526030908201527f556e6972657020536f6369616c3a207468652065706f6368206b65792068617360408201526f081899595b88185a5c991c9bdc1c195960821b606082015260800190565b6020808252603a908201527f556e6972657020536f6369616c3a2073686f756c64206f6e6c792063686f6f7360408201527f6520746f207570766f7465206f7220746f20646f776e766f7465000000000000606082015260800190565b60208082526041908201527f556e6972657020536f6369616c3a20757365722073686f756c6420686176652060408201527f7369676e656420757020696e20556e6972657020536f6369616c206265666f726060820152606560f81b608082015260a00190565b60208082526056908201527f556e6972657020536f6369616c3a207375626d697420646966666572656e742060408201527f6e756c6c69666965727320616d6f756e742066726f6d207468652072657175696060820152751c995908185b5bdd5b9d08199bdc8818dbdb5b595b9d60521b608082015260a00190565b845181526020808601519082015260408086015190820152606080860151908201526080948501519481019490945260a084019290925260c083015260e08201526101000190565b600060208252611afb6020830184611601565b9392505050565b60006101a082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015260a0830151611b4960a084018261159e565b5092915050565b6000604082528351604083015260208401516101e06060840152611b786102208401826115c7565b9050604085015160808401526060850151603f19808584030160a0860152611ba083836115c7565b9250608087015160c086015260a08701519150808584030160e086015250611bc882826115c7565b91505060c085015161010084015260e0850151611be961012085018261159e565b50828103602084015261171281856115c7565b848152602081018490526040810183905261016081016101008360608401376000815295945050505050565b600085825284602083015283604083015260806060830152611c4d6080830184611601565b9695505050505050565b604051601f8201601f1916810167ffffffffffffffff81118282101715611c8057611c80611cd5565b604052919050565b60008219821115611c9b57611c9b611cbf565b500190565b6000816000190483118215151615611cba57611cba611cbf565b500290565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea2646970667358221220146f19ef9376b7456ca76edb8af1087a179d5c3026743aada07ce5ac8689918164736f6c63430008010033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: ({
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): UnirepSocialInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): UnirepSocial;
}
export {};

/* ============================================================
 * Java SE · 知识卡片数据
 * 答案与解析均依据 Java 语言规范核对，程序题输出经实际编译运行验证
 * ============================================================ */

const QUESTION_BANK = {
  meta: {
    title: 'DevNotes · 知识卡片',
    subtitle: '技术笔记 · 代码片段 · 知识卡片',
    version: '1.0.0'
  },
  categories: [
    { id: 'fill',    name: '填空题',   icon: 'edit',   desc: '核心概念与关键字' },
    { id: 'choice',  name: '选择题',   icon: 'check',  desc: 'Java 基础单选' },
    { id: 'judge',   name: '判断题',   icon: 'toggle', desc: '概念辨误' },
    { id: 'program', name: '程序分析', icon: 'code',   desc: '读代码 · 写输出' }
  ],
  questions: [

    /* ---------------- 一、填空题（10 题） ---------------- */
    {
      id: 'F1', cat: 'fill', type: 'blank',
      stem: '关键字 ______ 引入类的定义；______ 是一个特殊的方法，用于初始化一个类的对象，它与类名相同。',
      blanks: ['class', '构造方法'],
      analysis: 'Java 关键字全部小写，class 用于声明类（注意文档中的 "Class" 是笔误，java.lang.Class 是反射里的类名，不是关键字）。构造方法名必须与类名完全相同，没有返回值类型（连 void 都不能写），在 new 对象时由系统自动调用。',
      tag: '面向对象'
    },
    {
      id: 'F2', cat: 'fill', type: 'blank',
      stem: '获取一维数组 arr 的长度，可以使用它的 ______ 属性。',
      blanks: ['length'],
      analysis: '数组是对象，长度用 arr.length 属性获取，注意不是方法、不带括号。对比：String 的长度用 s.length() 方法，集合（List）用 list.size() 方法。',
      tag: '数组'
    },
    {
      id: 'F3', cat: 'fill', type: 'blank',
      stem: '数组元素作为成员方法的参数时，是 ______ 传递；数组名作为成员方法的参数时，是 ______ 传递。',
      blanks: ['单向', '双向地址'],
      accept: [['单向', '值', '值传递'], ['双向地址', '地址', '双向', '引用', '引用传递']],
      analysis: '教材口径：传数组元素（基本类型值）是单向的值传递，方法内改形参不影响实参；传数组名是双向的地址（引用）传递——传递的是引用的副本，方法内通过引用修改数组元素会反映到原数组。严格来说 Java 只有值传递，传引用类型时传的是"地址值"，所以能改对象内容。',
      tag: '方法参数'
    },
    {
      id: 'F4', cat: 'fill', type: 'blank',
      stem: 'OOP 三大特征：封装、继承、______。',
      blanks: ['多态'],
      analysis: '面向对象三大特性：封装（隐藏内部细节）、继承（复用父类代码）、多态（同一消息不同对象有不同响应）。多态的实现依赖继承/接口 + 方法重写 + 父类引用指向子类对象。',
      tag: '面向对象'
    },
    {
      id: 'F5', cat: 'fill', type: 'blank',
      stem: '在 Java 程序中，通过类的定义只能实现单重继承，但通过 ______ 的定义可以实现多重继承关系。',
      blanks: ['接口'],
      analysis: 'Java 类只支持单继承（一个直接父类），用 implements 可实现多个接口，借此获得多重继承的效果。Java 8 之后接口还可有 default 方法。',
      tag: '接口'
    },
    {
      id: 'F6', cat: 'fill', type: 'blank',
      stem: '用 final 修饰的类 ______ 被继承；final 修饰的局部变量，只允许赋值 ______ 次。',
      blanks: ['不能', '一'],
      analysis: 'final 修饰类表示该类不能有子类（如 String、Math）；final 修饰变量表示其值一旦赋值就不能再改，局部变量只能赋值一次（可以在声明时不赋值，但之后只能赋一次）。',
      tag: '关键字'
    },
    {
      id: 'F7', cat: 'fill', type: 'blank',
      stem: 'Java 中 ______ 块用于监控可能发生异常的代码；______ 块用来捕获处理异常对象。若要在方法签名处声明抛出异常，需使用 ______ 关键字。',
      blanks: ['try', 'catch', 'throws'],
      analysis: 'try 中放可能抛异常的代码；catch 按类型捕获并处理；throws 写在方法声明处，说明本方法可能抛出的异常类型，由调用者处理。区分：throw 是在方法体内手动抛出一个异常对象。',
      tag: '异常处理'
    },
    {
      id: 'F8', cat: 'fill', type: 'blank',
      stem: '在子类中，表示当前对象引用的关键字是 ______，用于调用直接父类成员的关键字是 ______。',
      blanks: ['this', 'super'],
      analysis: 'this 指向当前对象，常用于区分同名的成员变量与局部变量、调用本类构造方法（this(...)）；super 指向父类部分，用于访问被隐藏的父类成员、调用父类构造方法（super(...)）。',
      tag: '面向对象'
    },
    {
      id: 'F9', cat: 'fill', type: 'blank',
      stem: 'Java 用 ______ 关键字指明继承关系；标记为 ______ 的数据成员只能由该类访问。',
      blanks: ['extends', 'private'],
      analysis: 'class 子类 extends 父类 表示继承。private 成员只能在声明它的类内部访问，子类不能直接访问（但可通过父类提供的 public/protected 方法间接操作），这是封装的体现。',
      tag: '面向对象'
    },
    {
      id: 'F10', cat: 'fill', type: 'blank',
      stem: 'Java 源文件中最多可以定义 ______ 个 public 类；含有 public 类的源文件名必须和 ______ 保持一致。',
      blanks: ['1', 'public 类名'],
      analysis: '一个 .java 文件最多一个 public 类（也可以一个都没有），且文件名必须与 public 类的类名完全一致（含大小写）。其他非 public 类可以有很多个。',
      tag: 'Java 基础'
    },

    /* ---------------- 二、选择题（11 题，原文第 12 题题干残缺已剔除） ---------------- */
    {
      id: 'C1', cat: 'choice', type: 'single',
      stem: 'Java 语言具有平台无关性，这主要得益于（  ）。',
      options: { A: '丰富的类库', B: 'Java 虚拟机（JVM）', C: '面向对象特性', D: '垃圾回收机制' },
      answer: 'B',
      analysis: 'Java 源码编译成与平台无关的字节码（.class），由各平台上的 JVM 解释/编译执行，从而"一次编写，到处运行"。类库、面向对象、GC 都不是跨平台能力的根本原因。',
      tag: 'JVM'
    },
    {
      id: 'C2', cat: 'choice', type: 'single',
      stem: '关于短路运算符 && 说法正确的是（  ）。',
      options: { A: '左边为 false，右边表达式不执行', B: '左边为 true，右边不执行', C: '&& 和 & 没有任何区别', D: '&& 是位运算符' },
      answer: 'A',
      analysis: '&& 是短路与：左边为 false 时整个表达式已确定为 false，右边不再求值（可避免空指针等副作用）。& 是非短路与，也可作整数的按位与。&& 是逻辑运算符，不是位运算符。',
      tag: '运算符'
    },
    {
      id: 'C3', cat: 'choice', type: 'single',
      stem: '若 ch 为 StringBuffer 对象，ch = "Java Applet"，则分别执行 ch.insert(3,\'p\')、ch.append(" Basic")、ch.reverse() 后，输出结果为（  ）。',
      options: {
        A: 'Javpa·Applet, Java AppletBasic, avaJ·telppA',
        B: 'Javpa·Applet, Java Applet Basic, telppA·avaJ',
        C: 'Javap·Applet, Java AppletBasic, avaJ·telppA',
        D: 'Javp·Applet, Java Applet Basic, telppA·avaJ'
      },
      answer: 'B',
      analysis: '题中"分别执行"指三条语句各自从初始值 "Java Applet" 出发独立执行（·表示空格）：① insert(3,\'p\') 在下标 3 处插入字符 p → "Javpa Applet"；② append(" Basic") 追加 → "Java Applet Basic"；③ reverse() 反转 → "telppA avaJ"。三者与 B 完全一致。若在 same 对象上连续执行，结果应为 "cisaB telppA apvaJ"，不在选项中，故选 B。',
      tag: 'StringBuffer'
    },
    {
      id: 'C4', cat: 'choice', type: 'single',
      stem: '下列关于 Java 一维数组的声明和初始化，正确的是（  ）。',
      options: { A: 'int arr[5]={1,2,3,4,5};', B: 'int[] arr=new int[5]{1,2,3,4,5};', C: 'int[] arr={1,2,3,4,5};', D: 'int[] arr=new int();' },
      answer: 'C',
      analysis: 'C 是静态初始化的正确写法。A 是 C/C++ 风格，Java 不允许在方括号中写长度；B 中 new int[5] 与 {...} 不能同时使用；D 中 new int() 是分配单个 int，不能赋给数组引用。',
      tag: '数组'
    },
    {
      id: 'C5', cat: 'choice', type: 'single',
      stem: '下列关于 Java 继承的描述，错误的是（  ）。',
      options: {
        A: 'Java 支持单继承，一个类只能有一个直接父类。',
        B: '子类可以继承父类的所有非私有成员。',
        C: '子类可以重写（Override）父类的方法。',
        D: 'Java 允许一个类同时继承多个父类来实现代码复用。'
      },
      answer: 'D',
      analysis: 'Java 类只支持单继承，不能用 extends 继承多个父类，多继承的效果通过实现多个接口实现，故 D 错误。A、B、C 均为正确描述（构造方法和 private 成员不被继承，其余非私有成员可继承）。',
      tag: '继承'
    },
    {
      id: 'C6', cat: 'choice', type: 'single',
      stem: '执行代码 String [] s = new String[10]; 后，结论正确的是（  ）。',
      options: { A: 's[10] 为 ""', B: 's[9] 为 null', C: 's[0] 为未定义', D: 's.length 为 11' },
      answer: 'B',
      analysis: 'new String[10] 创建长度为 10 的引用数组，下标 0~9，元素默认初始化为 null，因此 s[9] 为 null，s.length 为 10。s[10] 越界会抛 ArrayIndexOutOfBoundsException；s[0] 有确定值 null，不是"未定义"。',
      tag: '数组'
    },
    {
      id: 'C7', cat: 'choice', type: 'single',
      stem: '在异常处理机制中，必须放在所有 catch 块最后，且无论是否发生异常都会执行的代码块是（  ）。',
      options: { A: 'try', B: 'catch', C: 'throw', D: 'finally' },
      answer: 'D',
      analysis: 'finally 块总是与 try 配套，位于所有 catch 之后，无论是否发生异常都会执行，常用于释放资源。注意极端情况（如 System.exit(0)、线程被强制终止）下 finally 不会执行。',
      tag: '异常处理'
    },
    {
      id: 'C8', cat: 'choice', type: 'single',
      stem: '接口（Interface）中定义的方法，默认的修饰符是（  ）。',
      options: { A: 'private', B: 'protected', C: 'public abstract', D: 'static final' },
      answer: 'C',
      analysis: '接口中的普通方法默认且只能是 public abstract（可以省略不写）；常量默认是 public static final。Java 8 起可有 default 方法和 static 方法，Java 9 起可有 private 方法，但题目所指的常规方法默认修饰符是 public abstract。',
      tag: '接口'
    },
    {
      id: 'C9', cat: 'choice', type: 'single',
      stem: '以下关于构造方法的描述，错误的是（  ）。',
      options: {
        A: '构造方法名必须与类名相同。',
        B: '一个类只能有一个构造方法。',
        C: '构造方法没有返回值，甚至连 void 也没有。',
        D: '如果没有显式定义构造方法，系统会提供一个默认的无参构造方法。'
      },
      answer: 'B',
      analysis: '一个类可以定义多个构造方法（通过参数列表不同构成重载），所以 B 错误。A、C、D 描述正确：构造方法名同类名、无返回类型；一旦显式定义了任何构造方法，系统就不再提供默认无参构造。',
      tag: '构造方法'
    },
    {
      id: 'C10', cat: 'choice', type: 'single',
      stem: '下列属于合法的 Java 标识符的是（  ）。',
      options: { A: '6people', B: '_category', C: '-sc', D: 'class' },
      answer: 'B',
      analysis: 'Java 标识符由字母、数字、下划线 _、美元符 $ 组成，不能以数字开头，不能是关键字。A 以数字开头；C 含非法字符 -；D 是关键字；只有 B 合法。',
      tag: 'Java 基础'
    },
    {
      id: 'C11', cat: 'choice', type: 'single',
      stem: 'Java 的异常处理语句中，捕获异常的语句是（  ）。',
      options: { A: 'try', B: 'catch', C: 'throw', D: 'finally' },
      answer: 'B',
      analysis: 'try 用于监控可能出错的代码，catch 紧随 try 之后捕获并处理指定类型的异常，throw 手动抛出异常对象，finally 执行清理。因此"捕获"对应 catch。',
      tag: '异常处理'
    },
    {
      id: 'C12', cat: 'choice', type: 'single',
      stem: '通过输入数据流读取键盘输入字符；输入 L/l 代表投李、W/w 代表投王、Z/z 代表投张。使用 while 循环，只要输入字符不等于 # 就持续统计票数；当输入 # 时退出循环，输出三人票数。main 方法头部声明 throws IOException。关于该程序，下面说法正确的是（  ）。',
      options: {
        A: '当输入的字符不是 # 时，会出现输入输出异常。',
        B: '当输入字母以外的其他字符时，会出现输入输出异常。',
        C: '因为有 throws 语句，程序在不输入 L/l、W/w、Z/z 时只是不统计，不会有异常。',
        D: '当没有任何输入，直接回车后，会有输入输出异常。'
      },
      answer: 'C',
      analysis: 'throws IOException 只是「声明」本方法可能抛出该异常、把处理责任交给调用者，并不代表一定会真的抛出。read() 读取到任何字符（含回车换行符）都只是返回一个字符值，不会因字符内容而抛异常：读到 L/l、W/w、Z/z 时对应票数 +1，读到其他字符只是 switch 没有匹配分支、不做统计而已，程序继续循环直到读到 # 才退出。故 C 正确；A、B、D 都误把「声明异常」当成「发生异常」。',
      tag: '异常处理'
    },

    /* ---------------- 三、判断题（14 题） ---------------- */
    {
      id: 'J1', cat: 'judge', type: 'judge',
      stem: 'Java 中，异常（Exception）是指程序在编译和运行时出现的错误。',
      answer: 'F',
      analysis: '错误。异常是程序在运行期发生的、打断正常流程的事件（如空指针、数组越界）。编译期的语法错误属于编译错误，不是异常，必须先修正才能生成字节码。',
      tag: '异常处理'
    },
    {
      id: 'J2', cat: 'judge', type: 'judge',
      stem: '抽象类（Abstract Class）能被实例化，只能作为父类被继承。',
      answer: 'F',
      analysis: '错误。抽象类不能被 new 实例化，只能作为父类被继承；由子类实现其抽象方法后才能创建对象。即使抽象类中没有抽象方法也不能实例化。',
      tag: '抽象类'
    },
    {
      id: 'J3', cat: 'judge', type: 'judge',
      stem: '所有的 Java 异常类都直接或间接继承自 java.lang.Throwable 类。',
      answer: 'T',
      analysis: '正确。Throwable 是异常体系的根类，其下有 Error（错误）和 Exception（异常）两大分支，Exception 又分受检异常（如 IOException）和运行时异常 RuntimeException。',
      tag: '异常处理'
    },
    {
      id: 'J4', cat: 'judge', type: 'judge',
      stem: '使用 new 关键字创建一个对象时，Java 会自动调用构造方法初始化该新建的对象。',
      answer: 'T',
      analysis: '正确。new 会分配内存、调用对应的构造方法完成初始化，然后返回对象引用。若类未定义构造方法，编译器提供默认无参构造。',
      tag: '构造方法'
    },
    {
      id: 'J5', cat: 'judge', type: 'judge',
      stem: 'Collection 是集合类的接口，是所有集合类的父类。',
      answer: 'F',
      analysis: '错误。Collection 是 List、Set、Queue 等集合的根接口，而不是 Map 体系的父接口（Map 是独立顶层接口）；并且接口应称"父接口"而非"父类"，表述不准确。',
      tag: '集合'
    },
    {
      id: 'J6', cat: 'judge', type: 'judge',
      stem: '静态方法中能直接使用 this 关键字。',
      answer: 'F',
      analysis: '错误。static 方法属于类、在对象创建前就存在，没有 this 引用，也不能直接访问实例成员；只能通过对象引用间接访问实例成员。',
      tag: 'static'
    },
    {
      id: 'J7', cat: 'judge', type: 'judge',
      stem: '抽象类是体现数据抽象的思想，是实现程序多态性的一种手段。',
      answer: 'T',
      analysis: '正确。抽象类提取共性行为、把具体实现交给子类，配合方法重写和多态引用（如 Shapes s = new Circle(...)），是实现多态的常用手段。',
      tag: '抽象类'
    },
    {
      id: 'J8', cat: 'judge', type: 'judge',
      stem: '子类重写父类方法时，子类方法的访问权限不能低于父类方法的访问权限。',
      answer: 'T',
      analysis: '正确。重写时访问权限只能放宽不能收紧（如父类 protected，子类可改 public，不能改 private），否则会破坏多态调用约定，编译器会报错。',
      tag: '重写'
    },
    {
      id: 'J9', cat: 'judge', type: 'judge',
      stem: 'super 表示的是当前对象的直接父类对象，是当前对象的直接父类对象的引用。',
      answer: 'T',
      analysis: '正确（教材表述）。super 指向当前对象中属于父类的那部分存储区，可用于访问父类成员、调用父类构造与方法。严格说它并不是一个独立的父类对象，但按课程口径判对。',
      tag: 'super'
    },
    {
      id: 'J10', cat: 'judge', type: 'judge',
      stem: 'java.util 库是 Java 语言的核心类库，包含了运行 Java 程序必不可少的系统类，该包在 Java 程序运行时系统会自动引入。',
      answer: 'F',
      analysis: '错误。自动导入的是 java.lang 包；java.util 需用 import 显式导入（如 Scanner、Arrays、集合类等）。核心类库的说法也特指 java.lang。',
      tag: '包'
    },
    {
      id: 'J11', cat: 'judge', type: 'judge',
      stem: '抽象类中可以没有抽象方法，但是有抽象方法的类必须是抽象类。',
      answer: 'T',
      analysis: '正确。抽象类可以不包含任何抽象方法（仍不能被实例化）；反过来，一旦类中有抽象方法，该类必须声明为 abstract。',
      tag: '抽象类'
    },
    {
      id: 'J12', cat: 'judge', type: 'judge',
      stem: 'Java 中，用 static 修饰符修饰的数据成员不属于任何一个类的具体对象，而是属于类的静态数据成员。',
      answer: 'T',
      analysis: '正确。静态成员属于类，被该类所有对象共享，在类装载时分配一次内存，可通过类名直接访问。',
      tag: 'static'
    },
    {
      id: 'J13', cat: 'judge', type: 'judge',
      stem: '在 Java 中，String 类被 final 修饰，因此它的值在创建后是可以被直接修改的。',
      answer: 'F',
      analysis: '错误。String 被 final 修饰意味着类不能被继承、对象内容不可变（value 数组私有且无修改方法）。任何"修改"（如 concat、replace）都会创建新对象。StringBuilder/StringBuffer 才支持原地修改。',
      tag: 'String'
    },
    {
      id: 'J14', cat: 'judge', type: 'judge',
      stem: 'finally 代码块一定执行，System.exit(0) 也不例外。',
      answer: 'F',
      analysis: '错误。System.exit(0) 会直接终止 JVM，finally 不会执行；此外 JVM 崩溃、线程被强制中断等极端情况也不能保证 finally 执行。',
      tag: '异常处理'
    },

    /* ---------------- 四、程序分析（6 题，输出均为实际编译运行结果） ---------------- */
    {
      id: 'P1', cat: 'program', type: 'single',
      stem: '下列程序片段的输出是（  ）。',
      code: `int f1=1,f2=1;
for(int i=1;i<10/2;i++) {
    System.out.print("\\t"+f1+"\\t"+f2);
    if(i%2==0) System.out.println("\\n");
    f1=f1+f2;
    f2=f2+f1;
}`,
      options: {
        A: '1  1  2  3\n5  8  13 21（两行输出）',
        B: '1  1  2  3  5  8  13 21（一行输出）',
        C: '1  2  3  5  8  13  21 34（两行输出）',
        D: '1  1  2  3\n5  8  13  21\n34 55（三行输出）'
      },
      answer: 'A',
      analysis: '循环条件 i<10/2 即 i<5，执行 i=1..4 共 4 次，每次打印 f1、f2 两个数，共输出 8 个数；i 为偶数时换行，因此分两行。f1、f2 按斐波那契规则更新：i=1 输出 1 1；i=2 输出 2 3；i=3 输出 5 8；i=4 输出 13 21。实际运行输出为两行：1 1 2 3 与 5 8 13 21，故选 A。',
      tag: '循环'
    },
    {
      id: 'P2', cat: 'program', type: 'single',
      stem: '下列程序用于输出 3~50 之间的奇数素数，每行 6 个。其输出结果是（  ）。',
      code: `int n=0,m,j,i;
for(i=3;i<=50;i+=2) {
    m=(int)Math.sqrt((double)i);
    for(j=2;j<=m;j++)
        if((i%j)==0) break;
    if(j>=m+1) {
        if(n%6==0) System.out.println("\\n");
        System.out.print(i+" ");
        n++;
    }
}`,
      options: {
        A: '3 5 7 11 13 17 / 19 23 29 31 37 41 / 43 47',
        B: '3 5 7 9 11 13 / 15 17 19 21 23 25 / 27 29 31 33 35 37',
        C: '2 3 5 7 11 13 / 17 19 23 29 31 37 / 41 43 47',
        D: '3 5 7 11 13 17 / 19 23 29 31 37 41 / 43 47 49'
      },
      answer: 'A',
      analysis: 'i 只取 3~50 的奇数；m 为 sqrt(i) 取整，内层用 j 试除，若整除则 break；当 j>=m+1 说明没有因子，是素数则输出并用 n 计数，每 6 个换行。实际运行输出为：3 5 7 11 13 17 / 19 23 29 31 37 41 / 43 47。B 含合数，C 含偶数 2（循环从 3 开始且步长 2），D 含合数 49。故选 A。',
      tag: '素数算法'
    },
    {
      id: 'P3', cat: 'program', type: 'single',
      stem: '下列程序中，Square(25,25) 的输出是（  ）。',
      code: `abstract class Shapes {
    public int width,height;
    public Shapes(int w,int h){this.width=w;this.height=h;}
    abstract double getArea();
    abstract double getPerimeter();
}
class Square extends Shapes {
    public double getArea(){return(width*height);}
    public double getPerimeter(){return(2*width+2*height);}
    public Square(int w,int h){super(w,h);}
}
// main: new Square(25,25) 后打印 Area 与 Perimeter`,
      options: {
        A: 'Square Area=625.0  Perimeter=100.0',
        B: 'Square Area=625.0  Perimeter=50.0',
        C: 'Square Area=50.0  Perimeter=100.0',
        D: 'Square Area=625  Perimeter=100'
      },
      answer: 'A',
      analysis: 'width=height=25，getArea() 返回 width*height = 625，由于返回类型为 double，实际值是 625.0；getPerimeter() 返回 2*25+2*25 = 100.0。注意字符串拼接 double 会带小数部分，因此输出 "Square Area=625.0  Perimeter=100.0"，选 A。',
      tag: '多态'
    },
    {
      id: 'P4', cat: 'program', type: 'single',
      stem: '下列程序执行后，subMAP(\'B\',\'D\') 的输出是（  ）。',
      code: `SortedMap<String,String> smap = new TreeMap<String,String>();
smap.put("D","04");
smap.put("A","01");
smap.put("C","03");
smap.put("B","02");
System.out.println("subMAP('B','D')="+smap.subMap("B","D"));`,
      options: {
        A: '{B=02, C=03, D=04}',
        B: '{B=02, C=03}',
        C: '{A=01, B=02}',
        D: '{C=03}'
      },
      answer: 'B',
      analysis: 'TreeMap 按 key 的自然顺序排序为 A、B、C、D。subMap(fromKey, toKey) 返回 [fromKey, toKey) 区间的视图，含 B 不含 D，故为 {B=02, C=03}。补充：headMap("C") 返回 {A=01, B=02}，firstKey() 为 A，lastKey() 为 D。故选 B。',
      tag: '集合'
    },
    {
      id: 'P5', cat: 'program', type: 'single',
      stem: '下列递归程序输出的结果是（  ）。',
      code: `public static int dg(int x) {
    if(x == 1) { return 1; }
    return x*dg(x-1);
}
// main: int c = dg(5); System.out.println(c);`,
      options: { A: '24', B: '120', C: '15', D: '5' },
      answer: 'B',
      analysis: 'dg 是递归求阶乘：dg(5)=5×dg(4)=5×4×3×2×dg(1)=5×4×3×2×1=120，递归出口为 x==1 时返回 1。实际运行输出 120，选 B。',
      tag: '递归'
    },
    {
      id: 'P6', cat: 'program', type: 'single',
      stem: '下列程序段输出的最大值、平均值是（  ）。',
      code: `int[] num = {3,28,34,67,87,4,5,56,13};
int max = num[0];
int sum = 0;
for(int i = 0; i < num.length; i++){
    sum += num[i];
    if(num[i] > max){ max = num[i]; }
}
double avg = (double)sum / num.length;
System.out.println("最大值：" + max);
System.out.printf("平均值：%.2f", avg);`,
      options: {
        A: '最大值：87  平均值：33.00',
        B: '最大值：87  平均值：33.67',
        C: '最大值：87  平均值：33',
        D: '最大值：67  平均值：33.00'
      },
      answer: 'A',
      analysis: '数组元素和 sum=3+28+34+67+87+4+5+56+13=297，共 9 个元素，avg=297/9=33.00（先转 double 避免整数除法），最大值是 87。printf 的 %.2f 保留两位小数，输出 "平均值：33.00"。故选 A。',
      tag: '数组'
    }

  ]
};

if (typeof module !== 'undefined' && module.exports) module.exports = QUESTION_BANK;

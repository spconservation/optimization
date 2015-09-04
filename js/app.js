// COPYRIGHT TAREK A LAHLOU 2015

var optApp = angular.module("optApp", ['ui.router','ui.bootstrap']);

optApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('opt', {
            url: '',
            views: {
                navbar: {
                    templateUrl: "partials/nav/nav.html"
                }, 
                mainContent: {
                    templateUrl: "partials/home.html"
                },
                footer: {
                    templateUrl: "partials/footer/footer.html"
                },
            },
        })
        .state('opt.home', {
            url: '/',
            views: {
                "mainContent@": {
                    templateUrl: "partials/home.html",
                }       
            },
        })
        .state('opt.overview', {
            url: '/overview',
            data: { x: "\\underline{x}",
                    a: "\\underline{a}",
                    b: "\\underline{b}",
                    c: "\\underline{c}",
                    d: "\\underline{d}",
                    m1: "m_{1}(\\cdot)",
                    m2: "m_{2}(\\cdot)",
                    X: "\\mathcal{X}",
                    Xex: "\\displaystyle \\mathcal{X} = \\bigcap_{k=1}^{K} \\mathcal{X}_{k}",
                    Xk: "\\displaystyle \\mathcal{X}_{k}",
                    X1: "\\displaystyle \\mathcal{X} = \\left\\{ \\underline{x}  \\enspace \\colon \\enspace  A\\underline{x} = \\underline{b} \\right\\}",
                    X2: "\\displaystyle \\mathcal{X} = \\left\\{ \\underline{x}  \\enspace \\colon \\enspace  A\\underline{x} \\leq \\underline{b} \\right\\}",
                    X3: "\\displaystyle \\mathcal{X} = \\left\\{ (x,y,z)  \\enspace \\colon \\enspace  x\\cdot y = z \\right\\}",
                    X4: "\\displaystyle \\mathcal{X} = \\left\\{ (x,y)  \\enspace \\colon \\enspace  y = m(x) \\right\\}",
                    Q: "Q",
                    Qx: "Q(\\underline{x})",
                    negQ: "-Q(\\underline{x})",
                    optFormulation: "\\begin{align} \\underset{\\underline{x}}{\\text{minimize}} & & Q\\left(\\underline{x}\\right) \\\\ \\text{subject to} & & \\underline{x} \\in \\mathcal{X}\\end{align}",
                    Q1: "\\displaystyle Q\\left(\\underline{x}\\right) = \\sum_{k=1}^{K} Q_k(\\underline{x}_k)",
                    Q2: "\\displaystyle Q\\left(\\underline{x}\\right) = \\left\\| \\underline{x} \\right\\|_p^p = \\sum_{k=1}^{K} \\left|\\underline{x}_{k}\\right|^{p}",
                    Q3: "\\displaystyle Q\\left(\\underline{x}\\right) = \\underline{c}^T\\underline{x} = \\sum_{k=1}^{K}\\underline{c}_{k}\\underline{x}_{k} ",
                    Q4: "\\displaystyle Q\\left(\\underline{x}\\right) = \\underline{x}^TP\\underline{x} - \\underline{c}^T\\underline{x}",
                    conservation: "\\displaystyle \\underline{a}_{1}\\underline{b}_{1} + \\cdots + \\underline{a}_{K}\\underline{b}_{K} = 0 \\enspace\\enspace \\longleftrightarrow \\enspace\\enspace \\left(\\underline{c}_{1}^{2} - \\underline{d}_{1}^{2}\\right) + \\cdots + \\left(\\underline{c}_{K}^{2} - \\underline{d}_{K}^{2}\\right) = 0",
                },
            views: {
                "mainContent@": {
                    templateUrl: "partials/overview/home.html",
                    controller: "overviewController",
                  }     
            },
        })
        .state('opt.examples', {
            url: '/examples',
            views: {
                "mainContent@": {
                    templateUrl: "partials/examples/home.html",
                    controller: "examplesController",
                }      
            },
        })
        .state('opt.learn', {
            url: '/learn',
            views: {
                "mainContent@": {
                    templateUrl: "partials/learn/home.html",
                    controller: "learnController"
                }       
            },
        })
        .state('opt.contribute', {
            url: '/contribute',
            views: {
                "mainContent@": {
                    templateUrl: "partials/contribute/home.html",
                }      
            },
        })
        .state('opt.contact', {
            url: '/contact',
            views: {
                "mainContent@": {
                    templateUrl: "partials/footer/contact.html",
                }       
            },
        })
        .state('opt.disclaimer', {
            url: '/disclaimer',
            views: {
                "mainContent@": {
                    templateUrl: "partials/footer/disclaimer.html",
                }       
            },
        })
        .state('opt.privacy', {
            url: '/privacy',
            views: {
                "mainContent@": {
                    templateUrl: "partials/footer/privacy.html",
                }       
            },
        })
        .state('opt.examples.LPineq', {
            url: '/LPineq',
            data: {
                    problemName: "General Linear Programs", 
                    subtitle: "Linear algebra, on steroids",
                    path: "LPineq",
                    problemFormulation: "\\begin{align} \\underset{\\underline{x}}{\\text{minimize}} & & \\underline{f}^{T}\\underline{x} \\\\ \\text{subject to} & & A \\underline{x} \\leq \\underline{b} \\\\ & & \\underline{x} \\geq \\underline{0} \\end{align}",
                    structureTag: "/assets/img/general-system.png",
                    Alabel: "A",
                    flabel: "\\underline{f}",
                    blabel: "\\underline{b}",
                    },
            views: {
                "mainContent@": {
                    templateUrl: "partials/examples/example.html",
                    controller: "LPineqController",
                }      
            },
        })
        .state('opt.examples.QP', {
            url: '/QP',
            data: {
                    problemName: "General Quadratic Programs", 
                    subtitle: "The second-order Taylor expansion of optimization",
                    path: "QP",
                    problemFormulation: "\\begin{align} \\underset{\\underline{x}}{\\text{minimize}} & & \\underline{x}^{T}Q\\underline{x} + \\underline{f}^T\\underline{x} \\\\ \\text{subject to} & & A \\underline{x} \\leq \\underline{b}  \\end{align}",
                    structureTag: "/assets/img/general-system.png",
                    Alabel: "A",
                    Qlabel: "Q",
                    flabel: "\\underline{f}",
                    blabel: "\\underline{b}",
                    },
            views: {
                "mainContent@": {
                    templateUrl: "partials/examples/example.html",
                    controller: "QPController",
                }      
            },
        })
        .state('opt.examples.LASSO', {
            url: '/LASSO',
            data: {
                    problemName: "The LASSO Problem", 
                    subtitle: "Saving sparsity from clutter",
                    path: "LASSO",
                    problemFormulation: "\\begin{align} \\underset{\\underline{x}}{\\text{minimize}} & & \\left\\|\\underline{x}\\right\\|_{1} + \\frac{\\rho_{e}}{2}\\left\\|\\underline{e} \\right\\|_2^2 \\\\ \\text{subject to} & & \\underline{e} = A \\underline{x} - \\underline{b} \\end{align}",
                    structureTag: "/assets/img/general-system.png",
                    Alabel: "A",
                    blabel: "\\underline{b}",
                    rholabel: "\\rho_{e}"
                    },
            views: {
                "mainContent@": {
                    templateUrl: "partials/examples/example.html",
                    controller: "LASSOController",
                }      
            },
        })
        .state('opt.examples.NNLS', {
            url: '/NNLS',
            data: {
                    problemName: "Non-negative Least Squres", 
                    subtitle: "Least squares for the real world",
                    path: "NNLS",
                    problemFormulation: "\\begin{align} \\underset{\\underline{x}}{\\text{minimize}} & &  \\frac{1}{2}\\left\\|A \\underline{x} - \\underline{b} \\right\\|_2^2 \\\\ \\text{subject to}  & & \\underline{x} \\geq \\underline{0} \\end{align}",
                    structureTag: "/assets/img/general-system.png",
                    Alabel: "A",
                    blabel: "\\underline{b}",
                    },
            views: {
                "mainContent@": {
                    templateUrl: "partials/examples/example.html",
                    controller: "NNLSController",
                }      
            },
        })
        .state('opt.examples.BP', {
            url: '/BP',
            data: {
                    problemName: "The Basis Pursuit Problem", 
                    subtitle: "Linear programming for sparisty",
                    path: "BP",
                    problemFormulation: "\\begin{align} \\underset{\\underline{x}}{\\text{minimize}} & & \\left\\|\\underline{x}\\right\\|_{1}  \\\\ \\text{subject to} & & \\ A \\underline{x} = \\underline{b} \\end{align}",
                    structureTag: "/assets/img/general-system.png",
                    Alabel: "A",
                    blabel: "\\underline{b}"
                    },
            views: {
                "mainContent@": {
                    templateUrl: "partials/examples/example.html",
                    controller: "BPController",
                }      
            },
        })
        .state('opt.examples.DECODEL1', {
            url: '/DECODEL1',
            data: {
                    problemName: "Decoding by Linear Programming", 
                    subtitle: "Manhattan Norms for Overtdetermined Systems",
                    path: "DECODEL1",
                    problemFormulation: "\\begin{align} \\underset{\\underline{x}}{\\text{minimize }}  & \\left\\|\\underline{e}\\right\\|_{1} \\\\ \\text{s.t. } & \\underline{e} = A\\underline{x} - \\underline{b} \\end{align}",
                    structureTag: "/assets/img/general-system.png",
                    Alabel: "A",
                    blabel: "\\underline{b}"
                    },
            views: {
                "mainContent@": {
                    templateUrl: "partials/examples/example.html",
                    controller: "DECODEL1Controller",
                }      
            },
        });
    $urlRouterProvider.otherwise('/');
});

// controller for overview
optApp.controller('overviewController', function($scope,$state) {
    $scope.maxPages = 14;
    $scope.currentPage = 1;
    $scope.x  = $state.current.data.x;  $scope.a    = $state.current.data.a;    $scope.b  = $state.current.data.b;   $scope.c = $state.current.data.c; $scope.d = $state.current.data.d; $scope.m1 = $state.current.data.m1; $scope.m2 = $state.current.data.m2;
    $scope.X  = $state.current.data.X;  $scope.Xex  = $state.current.data.Xex;  $scope.Xk  = $state.current.data.Xk;
    $scope.X1 = $state.current.data.X1; $scope.X2   = $state.current.data.X2;
    $scope.X3 = $state.current.data.X3; $scope.X4   = $state.current.data.X4;
    $scope.Q  = $state.current.data.Q;
    $scope.Qx = $state.current.data.Qx; $scope.negQ = $state.current.data.negQ;
    $scope.Q1 = $state.current.data.Q1; $scope.Q2   = $state.current.data.Q2;
    $scope.Q3 = $state.current.data.Q3; $scope.Q4   = $state.current.data.Q4;
    $scope.optFormulation = $state.current.data.optFormulation; $scope.conservation = $state.current.data.conservation; 

});


// controller for examples page
optApp.controller('examplesController', function ($scope,$state) {
   
    // only group 6 problems per row at most for display purposes
    $scope.generalProblems = [
        {title: "Basis Pursuit",                  exploreUISref: "opt.examples.BP",       imgSrc: "/assets/img/examples/1norm.png",  description: "The smallest Manhattan norm solution to an underdetermined system."},
        {title: "Linear Programs",                exploreUISref: "opt.examples.LPineq",   imgSrc: "/assets/img/examples/eqLP.png",   description: "Solve a general linear programming problem."},
        {title: "Decoding by Linear Programming", exploreUISref: "opt.examples.DECODEL1", imgSrc: "/assets/img/examples/1norm.png",  description: "Decode a binary sequence after transmission over a bursty channel."},
        {title: "Non-Negative Least Squares",     exploreUISref: "opt.examples.NNLS",     imgSrc: "/assets/img/examples/nnls.png",   description: "Least squares problems with physical interpretations."},
        // {title: "Quadratic Programs",             exploreUISref: "opt.examples.QP",       imgSrc: "/assets/img/examples/QP.png",     description: "Solve a general quadratic optimization problem for an arbitrary problem setup."},
        {title: "The LASSO Problem",              exploreUISref: "opt.examples.LASSO",    imgSrc: "/assets/img/examples/lasso.png",  description: "Solving for sparse solutions in noisy measurement environments."},
        ]; 
    

    // $scope.machineLearning = [
    //     {title: "SVM Classification",       exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Some witty statement about the lasso problem."},
    //     {title: "Linear Regression",        exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Find the sparsest solution to a number of linear measurements in a compressed sensing setting."},
    //     {title: "Collaborative Filtering",  exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Determine a matching between a number of agents and a number of tasks while incurring lowest possible cost."},
    //     {title: "k-means",                  exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Determine a matching between a number of agents and a number of tasks while incurring lowest possible cost."},
    //     {title: "Maximum-liklihood",        exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Determine a matching between a number of agents and a number of tasks while incurring lowest possible cost."},
    //     {title: "Logistic Regression",      exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Determine a matching between a number of agents and a number of tasks while incurring lowest possible cost."},
    //     ]; 

    // $scope.LP1 = [
    //     {title: "Solving Linear Systems",     exploreUISref: "opt.home",           imgSrc: "/assets/img/examples/linsys.png", description: "Solve a general linear system for an arbitrary problem setup."},
    //     {title: "Equality Standard Form",   exploreUISref: "opt.examples.eqLP",   imgSrc: "/assets/img/examples/eqLP.png", description: "Solve the general case for an arbitrary problem setup."},
    //     {title: "Assignment Problem",       exploreUISref: "opt.home",            imgSrc: "/assets/img/examples/eqLP.png", description: "Determine a matching between a number of agents and a number of tasks while incurring lowest possible cost."},
    //     {title: "Profit Maximization",      exploreUISref: "opt.home",            imgSrc: "/assets/img/examples/profitLP.png",   description: "Select the optimal stock market portfolio taking capital-gains taxes, transaction friction, and leverage into account."},
    //     {title: "Chebyshev Center",         exploreUISref: "opt.home",            imgSrc: "/assets/img/examples/cheby.png",   description: "Find the largest ball inscribed in a set of points and the smallest ball contained within those points. more text is here now."},
    //     {title: "Transportation Problem",   exploreUISref: "opt.home",            imgSrc: "/assets/img/examples/eqLP.png", description: "Find the lowest cost solution to shipping goods between suppliers and consumers while adhering to capacity restrictions."},
    //     ]; 

    // $scope.LP2 = [
    //     {title: "Basis Pursuit",   exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Find the sparsest solution to a number of linear measurements in a compressed sensing setting."},
    //     {title: "Another Problem", exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Determine a matching between a number of agents and a number of tasks while incurring lowest possible cost."},
    //     {title: "Another Problem", exploreUISref: "opt.home", imgSrc: "/assets/img/examples/eqLP.png", description: "Determine a matching between a number of agents and a number of tasks while incurring lowest possible cost."},
    //     ]; 

    // $scope.norm = [
    //     {title: "Euclidean Norm",             exploreUISref: "opt.home", imgSrc: "/assets/img/examples/2norm.png",   description: "Minimize the sum of squares for a linear system of equations."},
    //     {title: "Supremum Norm",              exploreUISref: "opt.home", imgSrc: "/assets/img/examples/Infnorm.png", description: "Minimize the maximum coordinate error for a linear system of equations."},
    //     {title: "General p-Norm",             exploreUISref: "opt.home", imgSrc: "/assets/img/examples/pnorm.png",   description: "Minimize the general p-norm for a linear system of equations."},
    //     {title: "Weighted Euclidean Norm",    exploreUISref: "opt.home", imgSrc: "/assets/img/examples/w2norm.png",  description: "Minimize a weighted Euclidean norm for a linear system of equations."},
    //     {title: "Generalized Euclidean",      exploreUISref: "opt.home", imgSrc: "/assets/img/examples/genorm.png",   description: "Minimize a generalized Euclidean norm for a linear system of equations."},
    //     ]; 
});

// controller for examples page
optApp.controller('learnController', function ($scope) {
    $scope.papers = [
        {title: "Conservative Signal Processing Architectures For Asynchronous, Distributed Optimization Part I: General Framework",  authors: "Thomas A. Baran and Tarek A. Lahlou", description: "This paper overviews the general framework underlying the optimization techniques on this website.",             link: "http://arxiv.org/abs/1407.0418",                                                                                                                                  bibtexDocType: "INPROCEEDINGS", bibtexName: "ConservativeOptimizationPartI",   bibtexAuthor: "Baran, T. A. and Lahlou, T. A.",  bibtexDocType2: "booktitle",  bibtexConf: "IEEE Global Conference on Signal and Information Processing (GlobalSIP)",           bibtexYear: "2014", bibtexMonth: "Dec", bibtexPages:"35-39"},
        {title: "Conservative Signal Processing Architectures For Asynchronous, Distributed Optimization Part II: Example Systems",   authors: "Thomas A. Baran and Tarek A. Lahlou", description: "This paper provides several examples of the general framework outlined in Part I.",               link: "http://arxiv.org/abs/1407.0419",                                                                                                                                                 bibtexDocType: "INPROCEEDINGS", bibtexName: "ConservativeOptimizationPartII",  bibtexAuthor: "Baran, T. A. and Lahlou, T. A.",  bibtexDocType2: "booktitle",  bibtexConf: "IEEE Global Conference on Signal and Information Processing (GlobalSIP)",           bibtexYear: "2014", bibtexMonth: "Dec", bibtexPages:"40-44"},
        {title: "Asynchronous Algorithms for Solving Linear Programs",                                                                authors: "Tarek A. Lahlou and Thomas A. Baran", description: "This paper provides an in-depth case study of solving linear programs using conservative signal-flow structures", link: "http://arxiv.org/abs/1502.06784",                                                                                                                                bibtexDocType: "INPROCEEDINGS", bibtexName: "AsynchronousLinearPrograms",      bibtexAuthor: "Lahlou, T. A. and Baran, T. A.",  bibtexDocType2: "booktitle",  bibtexConf: "arXiv",                                                                             bibtexYear: "2015", bibtexMonth: "Mar", bibtexPages:"" },
        {title: "Implementation of Interconnective Systems ",                                                                         authors: "Thomas A. Baran and Tarek A. Lahlou", description: "This paper describes one possible way of automating the algebraic reduction which is used when interconnecting an LI with a source. The presentation, however, is for much more general scenarios.", link: "http://www.rle.mit.edu/dspg/documents/Baran-Lahlou-ICASSP2015-Implement.pdf", bibtexDocType: "INPROCEEDINGS", bibtexName: "ImplementationInterconnective",   bibtexAuthor: "Baran, T. A. and Lahlou, T. A.",  bibtexDocType2: "booktitle",  bibtexConf: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)", bibtexYear: "2015", bibtexMonth: "May", bibtexPages:"" },
        ]; 
});

// inequality linear programming controller
optApp.controller('LPineqController', function($scope,$state,examplesFactory,ccFactory) {
    $scope.meta = examplesFactory.getData();
    $scope.cc   = ccFactory.setup();
    $scope.bl   = blSetup();

    $scope.Alabel = $state.current.data.Alabel;
    $scope.flabel = $state.current.data.flabel;
    $scope.blabel = $state.current.data.blabel;
    $scope.params = {A: null, f: null, b: null};

    $scope.setupLocalSystem = function(){ $scope.mySystem = new blLPineqLocal($scope.params); setTimeout(function(){_blStem($scope.mySystem)}, 100)}

    $scope.setupDistSystem = function(){ $scope.mySystem = blLPineqDist($scope.params, $scope.meta.path);}

    $scope.example = function(){ $scope.params = blLPineqExample(); }
});

// general linear programming controller
optApp.controller('QPController', function($scope,$state,examplesFactory,ccFactory) {
    $scope.meta = examplesFactory.getData(); 
    $scope.cc   = ccFactory.setup();
    $scope.bl   = blSetup();

    $scope.Alabel = $state.current.data.Alabel;
    $scope.Qlabel = $state.current.data.Qlabel;
    $scope.flabel = $state.current.data.flabel;
    $scope.blabel = $state.current.data.blabel;
    $scope.params = {A: null, f: null, b: null};

    $scope.setupSystem = function(){
        // $scope.mySystem = new blGeneralLinearProgram($scope.params); 
    }

    $scope.example = function(){
        // $scope.params = blrandGeneralLP(); 
    }
});

// general LASSO controller
optApp.controller('LASSOController', function($scope,$state,examplesFactory,ccFactory) {
    $scope.meta = examplesFactory.getData();
    $scope.cc   = ccFactory.setup();
    $scope.bl   = blSetup();

    $scope.Alabel   = $state.current.data.Alabel;
    $scope.blabel   = $state.current.data.blabel;
    $scope.rholabel = $state.current.data.rholabel;
    $scope.params   = {A: null, b: null, rhoe: null};

    $scope.setupLocalSystem = function(){ $scope.mySystem = new blLASSOLocal($scope.params); setTimeout(function(){_blStem($scope.mySystem)}, 100)}

    $scope.setupDistSystem = function(){ $scope.mySystem = blLASSODist($scope.params, $scope.meta.path);}

    $scope.example = function(){ $scope.params = blLASSOExample(); }
});

// general BP controller
optApp.controller('BPController', function($scope,$state,examplesFactory,ccFactory) {
    $scope.meta = examplesFactory.getData();
    $scope.cc   = ccFactory.setup();
    $scope.bl   = blSetup();

    $scope.Alabel   = $state.current.data.Alabel;
    $scope.blabel   = $state.current.data.blabel;
    $scope.params   = {A: null, b: null};

    $scope.setupLocalSystem = function(){ $scope.mySystem = new blBPLocal($scope.params); setTimeout(function(){_blStem($scope.mySystem)}, 100)}

    $scope.setupDistSystem = function(){ $scope.mySystem = blBPDist($scope.params, $scope.meta.path);}

    $scope.example = function(){ $scope.params = blBPExample(); }
});

// general DECODEL1 controller
optApp.controller('DECODEL1Controller', function($scope,$state,examplesFactory,ccFactory) {
    $scope.meta = examplesFactory.getData();
    $scope.cc   = ccFactory.setup();
    $scope.bl   = blSetup();

    $scope.Alabel   = $state.current.data.Alabel;
    $scope.blabel   = $state.current.data.blabel;
    $scope.params   = {A: null, b: null};

    $scope.setupLocalSystem = function(){ $scope.mySystem = new blDECODEL1Local($scope.params); setTimeout(function(){_blStem($scope.mySystem)}, 100)}

    $scope.setupDistSystem = function(){ $scope.mySystem = blDECODEL1Dist($scope.params, $scope.meta.path);}

    $scope.example = function(){ $scope.params = blDECODEL1Example(); }
});



// NNLS controller
optApp.controller('NNLSController', function($scope,$state,examplesFactory,ccFactory) {
    $scope.meta = examplesFactory.getData();
    $scope.cc   = ccFactory.setup();
    $scope.bl   = blSetup();

    $scope.Alabel   = $state.current.data.Alabel;
    $scope.blabel   = $state.current.data.blabel;
    $scope.params   = {A: null, b: null};

    $scope.setupLocalSystem = function(){ $scope.mySystem = new blNNLSLocal($scope.params); setTimeout(function(){_blStem($scope.mySystem)}, 2)}

    $scope.setupDistSystem = function(){ $scope.mySystem = blNNLSDist($scope.params, $scope.meta.path); }

    $scope.example = function(){ $scope.params = blNNLSExample(); }
});


// factory for all example templates
optApp.factory('examplesFactory', function ($state) {
    var factory = {}; 
    factory.getData = function() {
        var meta                = {}; 
        meta.problemName        = $state.current.data.problemName; 
        meta.subtitle           = $state.current.data.subtitle; 
        meta.problemFormulation = $state.current.data.problemFormulation; 
        meta.descriptionPath    = "/partials/examples/problems/" + $state.current.data.path + "/description.html"; 
        meta.path               = $state.current.data.path; 
        meta.inputPath          = "/partials/examples/problems/" + $state.current.data.path + "/input.html"; 
        meta.plotPath           = "/partials/examples/problems/" + $state.current.data.path + "/plot.html"; 
        meta.distPlotPath       = "/partials/examples/problems/" + $state.current.data.path + "/plotDist.html";
        meta.structureTag       = $state.current.data.structureTag;  
        return meta; 
    }
    return factory; 
});

optApp.factory('ccFactory', function () {
    var factory = {}; 
    factory.setup = function() {
        var cc               = {"state": {"setup": false, "launchLocal": false, "launchDist": false}, 
                                "local": {"active": false, "settings": true}, 
                                "prob":  0.5};
        cc.setup       = function() { cc.state.setup = !cc.state.setup; };
        cc.launchLocal = function() { cc.state.launchLocal = !cc.state.launchLocal; };
        cc.launchDist  = function() { cc.state.launchDist = !cc.state.launchDist; $('#distParams').find('input, textarea, button, select').attr('disabled','disabled'); };
        cc.initLocal   = function() { cc.local.active = true;};
        cc.start       = function() { $(".localSolverRadio").attr('disabled', true);};
        cc.stop        = function() { $(".localSolverRadio").attr('disabled', false);};
        cc.reset       = function() { cc.prob = 0.5; };
        cc.settings    = function() { cc.local.settings = !cc.local.settings; };
        cc.quit        = function() { cc.state = {}; cc.local = {}; cc.dist = {};}; 
        return cc; 
    }
    return factory; 
});

// directive for mathjax
optApp.directive("mathjaxBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.mathjaxBind, function(texExpression) {
                    var texScript = angular.element("<script type='math/tex'>")
                    .html(texExpression ? texExpression :  "");
                $element.html("");
                $element.append(texScript);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
            });
        }]
    };
});

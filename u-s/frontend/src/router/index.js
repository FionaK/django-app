import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/routes/Home'
import SearchStrategy from '@/components/routes/SearchStrategy'
import Screening from '@/components/routes/Screening'
import MetaAnalysis from '@/components/routes/MetaAnalysis'
import Extraction from '@/components/routes/Extraction'
import PaperOverview from '@/components/routes/PaperOverview'
import Analysis from '@/components/routes/Analysis'
import test from '@/components/routes/test'
// Footers
import HomeFooter from '@/components/footers/HomeFooter'
import NextViewFooter from '@/components/footers/NextViewFooter'
import ScreeningFooter from '@/components/footers/ScreeningFooter'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        footer: HomeFooter,
      }
    },

    // Search Strategy View
    {
      path: '/meta-analysis/:id/search-strategy',
      name: 'SearchStrategy',
      components: {
        default: SearchStrategy,
        footer: NextViewFooter
      },
      props: {
        footer: { nextStepText: "Create Meta Analysis >"}
      }
    },

    // Creation View
    {
      path: '/meta-analysis/:id/creation',
      name: 'Creation',
      components: {
        default: MetaAnalysis,
        footer:NextViewFooter
      },
      props: {
        footer: { nextStepText: "Go to screening >"}
      }
    },
    {
      path:'/meta-analysis/:id/screening',
      name: 'Screening',
      components: {
        default: Screening,
        footer: ScreeningFooter
      }
    },
    {
      path: '/meta-analysis/:id/extraction/:article_id',
      name: 'Extraction',
      component: Extraction
    },
    {
      path:'/meta-analysis/:id/paper-overview',
      name: 'PaperOverview',
      component: PaperOverview
    },
    {
      path:'/meta-analysis/:id/analysis',
      name: 'Analysis',
      component: Analysis
    },
    {
      path: '/test',
      name: 'TestView',
      component: test
    }

  ]
})

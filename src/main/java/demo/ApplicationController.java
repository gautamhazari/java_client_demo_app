package demo;

import models.Subscriber;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import utils.PropertiesManager;
import utils.UrlUtils;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ApplicationController {
    private PropertiesManager propertiesManager = new PropertiesManager();

    @GetMapping(value = {"/", "index"})
    public String getParams(Model model) {
        model.addAttribute("request", new Subscriber());
        return "index";
    }

    @PostMapping(value = {"/", "startDiscovery"})
    public ModelAndView redirect(HttpServletRequest request, @ModelAttribute Subscriber subscriber) {
        String url = UrlUtils.getUrl(propertiesManager.getDiscoveryUrl(), subscriber);
        System.out.println(url);
        return new ModelAndView("redirect:" + url);
    }

    @PostMapping(value = {"connect", "withoutDiscovery"})
    public ModelAndView redirectWD(HttpServletRequest request, @ModelAttribute Subscriber subscriber) {
        String url = UrlUtils.getUrl(propertiesManager.getWithoutDiscoveryUrl(), subscriber);
        System.out.println(url);
        return new ModelAndView("redirect:" + url);
    }

    @GetMapping("connect")
    public String getParamsc(Model model) {
        model.addAttribute("request", new Subscriber());
        return "withoutDiscovery";
    }

//    @PostMapping("connect")
//    public ModelAndView redirectc(HttpServletRequest request, @ModelAttribute Subscriber subscriber) {
//        String url = UrlUtils.getDiscoveryUrl(propertiesManager.getDiscoveryUrl(), subscriber);
//        return new ModelAndView("redirect:" + url);
//    }

    @GetMapping("startDiscovery")
    public String getParamsD(Model model) {
        model.addAttribute("request", new Subscriber());
        return "withoutDiscovery";
    }

//    @PostMapping("startDiscovery")
//    public ModelAndView redirectD(HttpServletRequest request, @ModelAttribute Subscriber subscriber) {
//        String url = UrlUtils.getDiscoveryUrl(propertiesManager.getDiscoveryUrl(), subscriber);
//        return new ModelAndView("redirect:" + url);
//    }

    @GetMapping("withoutDiscovery")
    public String wd(Model model) {
        model.addAttribute("request", new Subscriber());
        return "withoutDiscovery";
    }
}
